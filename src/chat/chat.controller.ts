import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Endpoint to start a new chat session
  @Post('session')
  async createSession(@Body('userId') userId: string) {
    // In a real app, userId would come from an auth token
    return this.chatService.createSession(userId);
  }

  // Endpoint to post a new message to a session
  @Post(':sessionId/message')
  async postMessage(
    @Param('sessionId') sessionId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.postMessage(sessionId, content);
  }

  // Endpoint to get all messages for a session
  @Get(':sessionId/messages')
  async getMessages(@Param('sessionId') sessionId: string) {
    return this.chatService.getMessages(sessionId);
  }
}
