import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { ChatbotSetupService } from './chatbot-setup.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Import your audit logging service

@Controller('chatbot-setup')
@UseGuards(JwtAuthGuard)
export class ChatbotSetupController {
  constructor(private chatbotSetupService: ChatbotSetupService) {}

  @Get()
  getChatbotSetup(@Req() req) {
    const userId = req.user.id;
    return this.chatbotSetupService.getChatbotSetup(userId);
  }

  @Put('branding')
  async updateBranding(@Body() updateBrandingDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Consider fetching old branding data here if you want to log specific changes
      const updatedBranding = await this.chatbotSetupService.updateBranding(userId, updateBrandingDto);
      await logAuditAction(userId, 'UPDATE_CHATBOT_BRANDING', {
        actionDetails: {
          type: 'UPDATE_CHATBOT_BRANDING',
          status: 'Success',
          details: updateBrandingDto // Log the new values, be cautious with sensitive data
        },
      });
      return updatedBranding;
    } catch (error) {
      await logAuditAction(userId, 'UPDATE_CHATBOT_BRANDING', {
        actionDetails: {
          type: 'UPDATE_CHATBOT_BRANDING',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put('instructions')
  async updateInstructions(@Body() updateInstructionsDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Consider fetching old instructions data here
      const updatedInstructions = await this.chatbotSetupService.updateInstructions(userId, updateInstructionsDto);
      await logAuditAction(userId, 'UPDATE_BOT_INSTRUCTIONS', {
        actionDetails: {
          type: 'UPDATE_BOT_INSTRUCTIONS',
          status: 'Success',
          details: updateInstructionsDto // Log the new values, be cautious with sensitive data
        },
      });
      return updatedInstructions;
    } catch (error) {
      await logAuditAction(userId, 'UPDATE_BOT_INSTRUCTIONS', {
        actionDetails: {
          type: 'UPDATE_BOT_INSTRUCTIONS',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put('settings')
  async updateSettings(@Body() updateSettingsDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Consider fetching old settings data here
      const updatedSettings = await this.chatbotSetupService.updateSettings(userId, updateSettingsDto);
      await logAuditAction(userId, 'UPDATE_BOT_SETTINGS', {
        actionDetails: {
          type: 'UPDATE_BOT_SETTINGS',
          status: 'Success',
          details: updateSettingsDto // Log the new values, be cautious with sensitive data
        },
      });
      return updatedSettings;
    } catch (error) {
      await logAuditAction(userId, 'UPDATE_BOT_SETTINGS', {
        actionDetails: {
          type: 'UPDATE_BOT_SETTINGS',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put('appointment-booking')
  async updateAppointmentBooking(@Body() updateAppointmentBookingDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Consider fetching old appointment booking data here
      const updatedAppointmentBooking = await this.chatbotSetupService.updateAppointmentBooking(userId, updateAppointmentBookingDto);
      await logAuditAction(userId, 'UPDATE_APPOINTMENT_BOOKING', {
        actionDetails: {
          type: 'UPDATE_APPOINTMENT_BOOKING',
          status: 'Success',
          details: updateAppointmentBookingDto // Log the new values, be cautious with sensitive data
        },
      });
      return updatedAppointmentBooking;
    } catch (error) {
      await logAuditAction(userId, 'UPDATE_APPOINTMENT_BOOKING', {
        actionDetails: {
          type: 'UPDATE_APPOINTMENT_BOOKING',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }
}