#!/usr/bin/env node
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
require('dotenv').config();

// Simple color functions
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  bright: (text) => `\x1b[1m${text}\x1b[0m`,
};

// Latest Gemini 2.5 Models
const MODELS = {
  'flash': {
    name: 'gemini-2.5-flash',
    description: 'Gemini 2.5 Flash - Latest & Fastest 🚀',
    config: {
      maxOutputTokens: 8000,
      temperature: 0.3,
    }
  },
  'pro': {
    name: 'gemini-2.5-pro',
    description: 'Gemini 2.5 Pro - Maximum Intelligence 🧠',
    config: {
      maxOutputTokens: 8000,
      temperature: 0.2,
    }
  },
  'lite': {
    name: 'gemini-2.5-flash-lite-preview-06-17',
    description: 'Gemini 2.5 Flash Lite - Ultra Fast ⚡',
    config: {
      maxOutputTokens: 4000,
      temperature: 0.3,
    }
  }
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiCodeAgent {
  constructor(modelType = 'flash') {
    const selectedModel = MODELS[modelType] || MODELS.flash;

    this.model = genAI.getGenerativeModel({
      model: selectedModel.name,
      generationConfig: selectedModel.config
    });

    this.modelInfo = selectedModel;
    this.projectRoot = process.cwd();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async executeCommand(command, description = '') {
    console.log(colors.cyan(`🔄 ${description || `Executing: ${command}`}`));

    try {
      const result = execSync(command, {
        cwd: this.projectRoot,
        encoding: 'utf8',
        stdio: 'pipe'
      });

      console.log(colors.green(`✅ Success: ${description || command}`));
      if (result.trim()) {
        console.log(colors.gray(result));
      }
      return { success: true, output: result };
    } catch (error) {
      console.log(colors.red(`❌ Failed: ${description || command}`));
      console.error(colors.red(error.message));
      return { success: false, error: error.message };
    }
  }

  async readFile(filePath) {
    try {
      const fullPath = path.resolve(this.projectRoot, filePath);
      if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath, 'utf8');
      }
      return null;
    } catch (error) {
      console.error(colors.red(`Error reading ${filePath}: ${error.message}`));
      return null;
    }
  }

  async writeFile(filePath, content, description = '') {
    try {
      const fullPath = path.resolve(this.projectRoot, filePath);
      const dir = path.dirname(fullPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(fullPath, content);
      console.log(colors.green(`✅ ${description || `Updated ${filePath}`}`));
      return true;
    } catch (error) {
      console.error(colors.red(`Error writing ${filePath}: ${error.message}`));
      return false;
    }
  }

  async getProjectContext() {
    const packageJson = await this.readFile('package.json');

    const getFileStructure = (dir, prefix = '', maxDepth = 2, currentDepth = 0) => {
      if (currentDepth >= maxDepth) return '';

      let structure = '';
      try {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          if (item.startsWith('.') && !['env', 'gitignore'].some(f => item.includes(f))) return;
          if (['node_modules', 'dist', 'coverage'].includes(item)) return;

          const itemPath = path.join(dir, item);
          const stat = fs.statSync(itemPath);

          if (stat.isDirectory()) {
            structure += `${prefix}📁 ${item}/\n`;
            structure += getFileStructure(itemPath, prefix + '  ', maxDepth, currentDepth + 1);
          } else {
            structure += `${prefix}📄 ${item}\n`;
          }
        });
      } catch (error) {
        // Ignore permission errors
      }
      return structure;
    };

    return {
      packageJson: packageJson ? JSON.parse(packageJson) : null,
      fileStructure: getFileStructure(this.projectRoot),
      projectRoot: this.projectRoot
    };
  }

  async askGemini(prompt) {
    const projectContext = await this.getProjectContext();

    const systemPrompt = `You are an expert AI coding agent powered by ${this.modelInfo.description}.

You are working on a HIPAA-compliant NestJS healthcare chatbot.

AVAILABLE ACTIONS:
1. READ files - {"type": "read_file", "path": "file/path"}
2. WRITE/UPDATE files - {"type": "write_file", "path": "file/path", "content": "complete_file_content"}
3. EXECUTE shell commands - {"type": "execute_command", "command": "shell_command"}
4. CREATE directories - {"type": "create_directory", "path": "folder/path"}

PROJECT CONTEXT:
- Tech Stack: NestJS, TypeScript, Prisma, PostgreSQL, Vertex AI, Google Cloud Run
- HIPAA-compliant healthcare chatbot
- File Structure:
${projectContext.fileStructure}

RESPONSE FORMAT - ALWAYS respond with valid JSON:
{
  "analysis": "Your detailed analysis",
  "actions": [
    {
      "type": "read_file|write_file|execute_command|create_directory",
      "path": "exact file/directory path",
      "content": "complete file content (for write_file only)",
      "command": "exact shell command (for execute_command only)",
      "description": "What this action does"
    }
  ],
  "explanation": "Detailed explanation of the solution"
}

USER REQUEST: ${prompt}`;

    try {
      console.log(colors.yellow(`🤔 ${this.modelInfo.description} is thinking...`));
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      let jsonResponse;

      try {
        const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
        jsonResponse = JSON.parse(jsonText);
      } catch (e) {
        jsonResponse = {
          analysis: text,
          actions: [],
          explanation: "The AI provided advice: " + text
        };
      }

      return jsonResponse;
    } catch (error) {
      console.error(colors.red('Error communicating with Gemini:', error.message));
      return null;
    }
  }

  async executeActions(actions) {
    console.log(colors.blue('\n📋 Planned Actions:'));
    actions.forEach((action, i) => {
      console.log(colors.cyan(`${i + 1}. ${action.description}`));
    });

    const proceed = await this.question('\nExecute these actions? (y/n): ');

    if (proceed.toLowerCase() !== 'y' && proceed.toLowerCase() !== 'yes') {
      console.log(colors.yellow('Actions cancelled.'));
      return;
    }

    console.log(colors.blue('\n🚀 Executing Actions...\n'));

    for (const [index, action] of actions.entries()) {
      console.log(colors.magenta(`[${index + 1}/${actions.length}] ${action.description}`));

      switch (action.type) {
        case 'read_file':
          const content = await this.readFile(action.path);
          console.log(colors.green(`📖 Read ${action.path}`));
          if (content) {
            console.log(colors.gray(content.substring(0, 200) + (content.length > 200 ? '...' : '')));
          }
          break;

        case 'write_file':
          await this.writeFile(action.path, action.content, action.description);
          break;

        case 'create_directory':
          fs.mkdirSync(path.resolve(this.projectRoot, action.path), { recursive: true });
          console.log(colors.green(`📁 Created directory ${action.path}`));
          break;

        case 'execute_command':
          await this.executeCommand(action.command, action.description);
          break;

        default:
          console.log(colors.yellow(`Unknown action type: ${action.type}`));
      }
    }

    console.log(colors.green('\n✅ All actions completed!'));
  }

  async run(initialPrompt) {
    console.log(colors.bright(colors.blue('🤖 Gemini Code Agent - HIPAA Chatbot Assistant')));
    console.log(colors.magenta(`🧠 Using: ${this.modelInfo.description}\n`));

    let prompt = initialPrompt;

    while (true) {
      if (!prompt) {
        prompt = await this.question('What would you like me to help you with? (or "exit" to quit): ');
      }

      if (prompt.toLowerCase() === 'exit') break;

      const response = await this.askGemini(prompt);

      if (!response) {
        console.log(colors.red('Failed to get response from Gemini.'));
        prompt = null;
        continue;
      }

      console.log(colors.green('\n📊 Analysis:'));
      console.log(response.analysis);

      if (response.actions && response.actions.length > 0) {
        await this.executeActions(response.actions);
      }

      console.log(colors.blue('\n💡 Explanation:'));
      console.log(response.explanation);

      prompt = null;
    }

    console.log(colors.blue('\n👋 Goodbye!'));
    this.rl.close();
  }
}

// CLI Usage
const [,, ...args] = process.argv;
let modelType = 'flash';
let prompt = '';

if (args[0] === '--pro') {
  modelType = 'pro';
  prompt = args.slice(1).join(' ');
} else if (args[0] === '--flash') {
  modelType = 'flash';
  prompt = args.slice(1).join(' ');
} else if (args[0] === '--lite') {
  modelType = 'lite';
  prompt = args.slice(1).join(' ');
} else {
  prompt = args.join(' ');
}

const agent = new GeminiCodeAgent(modelType);
agent.run(prompt).catch(console.error);
