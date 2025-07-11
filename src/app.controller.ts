// hipaa-backend/src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Remove 'api' from here to handle root routes
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Root health check at /
  @Get()
  root() {
    return {
      status: 'ok',
      message: 'HIPAA Chatbot is running! 🚀',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/',
        chat: '/api/chat',
        dashboardStats: '/api/dashboard-stats',
        recentConversations: '/api/recent-conversations'
      }
    };
  }

  // This handles GET requests to /api/dashboard-stats
  @Get('api/dashboard-stats')
  getDashboardStats() {
    return {
      totalConversations: { value: 152, change: 12 },
      appointmentsBooked: { value: 24, change: 8 },
      conversionRate: { value: 15.8, change: 3 },
      avgResponseTime: { value: 2.1, change: -0.3 },
    };
  }

  // This handles GET requests to /api/recent-conversations
  @Get('api/recent-conversations')
  getRecentConversations() {
    return [
      { id: 1, name: 'Sarah Johnson', message: "I'd like to schedule an appointment for next week.", status: 'Completed', time: '10 min ago', initial: 'S' },
      { id: 2, name: 'Michael Chen', message: "Do you accept insurance for therapy sessions?", status: 'Ongoing', time: '25 min ago', initial: 'M' },
      { id: 3, name: 'Emma Wilson', message: "What are your hours of operation?", status: 'Completed', time: '1 hour ago', initial: 'E' },
      { id: 4, name: 'James Rodriguez', message: "I need information about couples therapy.", status: 'Completed', time: '2 hours ago', initial: 'J' },
    ];
  }
}
