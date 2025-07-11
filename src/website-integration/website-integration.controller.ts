import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { WebsiteIntegrationService } from './website-integration.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Assuming your audit service is here

@Controller('website-integration')
@UseGuards(JwtAuthGuard)
export class WebsiteIntegrationController {
  constructor(private websiteIntegrationService: WebsiteIntegrationService) {}

  @Get()
  getSettings(@Req() req) {
    const userId = req.user.id;
    // Get website integration settings
    return this.websiteIntegrationService.getSettings(userId);
  }

  // Assuming there are configurable settings and a PUT endpoint for updates
  @Put('settings')
  async updateSettings(@Body() updateSettingsDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Fetch old settings before updating
      const oldSettings = await this.websiteIntegrationService.getSettings(userId);

      // Update website integration settings logic here
      const updatedSettings = await this.websiteIntegrationService.updateSettings(userId, updateSettingsDto);

      // Log the update
      await logAuditAction(userId, 'UPDATE_WEBSITE_INTEGRATION_SETTINGS', {
        actionDetails: {
          type: 'UPDATE_WEBSITE_INTEGRATION_SETTINGS',
          target: { type: 'WebsiteIntegrationSettings' },
          changes: {
             // Populate changes by comparing updateSettingsDto and oldSettings
             // Example: fieldName, oldValue, newValue for each changed field
          },
          status: 'Success',
        },
      });

      return updatedSettings;
    } catch (error) {
      // Log failure
      await logAuditAction(userId, 'UPDATE_WEBSITE_INTEGRATION_SETTINGS', {
        actionDetails: {
          type: 'UPDATE_WEBSITE_INTEGRATION_SETTINGS',
          target: { type: 'WebsiteIntegrationSettings' },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }
}