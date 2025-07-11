import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VertexAI } from '@google-cloud/vertexai';

@Injectable()
export class VertexAiService implements OnModuleInit {
  private readonly logger = new Logger(VertexAiService.name);
  private vertexAI: VertexAI;
  private model: any;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.vertexAI = new VertexAI({
        project: this.configService.get('GOOGLE_CLOUD_PROJECT'),
        location: this.configService.get('VERTEX_AI_LOCATION', 'us-central1'),
      });

      this.model = this.vertexAI.preview.getGenerativeModel({
        model: 'gemini-pro',
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
        // Simplified safety settings to avoid TypeScript issues
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH' as any,
            threshold: 'BLOCK_MEDIUM_AND_ABOVE' as any,
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT' as any,
            threshold: 'BLOCK_MEDIUM_AND_ABOVE' as any,
          },
        ],
      });

      this.logger.log('Vertex AI initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Vertex AI', error.stack);
    }
  }

  async generateResponse(message: string, conversationHistory: any[]): Promise<string> {
    try {
      // Build conversation context
      const systemPrompt = `You are a helpful healthcare assistant chatbot. You should:
      - Provide general health information and guidance
      - Encourage users to consult healthcare professionals for specific medical advice
      - Be empathetic and supportive
      - Never provide specific medical diagnoses or treatment recommendations
      - Maintain patient privacy and confidentiality
      - Ask clarifying questions when appropriate

      Remember: You are not a replacement for professional medical care.`;

      const contextMessages = [
        {
          role: 'user',
          parts: [{ text: systemPrompt + '\n\nUser: ' + message }],
        },
      ];

      // Add recent conversation history for context
      conversationHistory
        .reverse() // Chronological order
        .slice(-6) // Last 6 messages to keep context manageable
        .forEach((msg) => {
          contextMessages.push({
            role: msg.isBot ? 'model' : 'user',
            parts: [{ text: msg.message }],
          });
        });

      const result = await this.model.generateContent({
        contents: contextMessages,
      });

      const response = result.response;
      const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('No response generated from AI model');
      }

      return generatedText;
    } catch (error) {
      this.logger.error('Vertex AI generation error', error.stack);
      throw new Error('AI service temporarily unavailable');
    }
  }
}
