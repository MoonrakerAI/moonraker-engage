import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createSession(userId: string) {
    // In a real implementation, you'd verify the user exists.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        // This is a placeholder for development. In a real app, this would be an error.
        await this.prisma.user.create({
            data: { id: userId, email: `${userId}@example.com` }
        });
    }

    return this.prisma.chatSession.create({
      data: {
        userId,
      },
    });
  }

  async postMessage(sessionId: string, content: string) {
    // TODO: Implement content encryption before saving to DB for HIPAA compliance.
    // TODO: Implement actual chat logic with Vertex AI.

    // 1. Save the user's message (content should be encrypted).
    const userMessage = await this.prisma.chatMessage.create({
        data: {
            chatSessionId: sessionId,
            content: content, 
            sender: 'USER',
        }
    });

    // 2. Get response from Vertex AI (placeholder).
    const botResponseContent = `This is a placeholder response to: "${content}"`;

    // 3. Save the bot's response (content should be encrypted).
    const botMessage = await this.prisma.chatMessage.create({
        data: {
            chatSessionId: sessionId,
            content: botResponseContent, 
            sender: 'BOT',
        }
    });

    return { userMessage, botMessage };
  }

  async getMessages(sessionId: string) {
    const session = await this.prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!session) {
        throw new NotFoundException(`Session with ID ${sessionId} not found.`);
    }

    // TODO: Implement content decryption before sending to client.
    return session.messages;
  }
}
