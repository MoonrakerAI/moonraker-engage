import { Controller, Put, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Assuming the audit service path

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('password')
  async changePassword(@Body() changePasswordDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Change password logic
      await this.accountService.changePassword(userId, changePasswordDto);
      await logAuditAction(userId, 'CHANGE_PASSWORD', { actionDetails: { type: 'CHANGE_PASSWORD', status: 'Success' } });
      return { success: true };
    } catch (error) {
      await logAuditAction(userId, 'CHANGE_PASSWORD', {
        actionDetails: {
          type: 'CHANGE_PASSWORD',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put('email')
  async updateEmail(@Body() updateEmailDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Get old email before updating
      const oldUser = await this.accountService.getUserById(userId); // Assuming a method to get user by ID
      const oldEmail = oldUser ? oldUser.email : null;

      // Update email logic
      const updatedUser = await this.accountService.updateEmail(userId, updateEmailDto);

      await logAuditAction(userId, 'UPDATE_EMAIL', {
        actionDetails: {
          type: 'UPDATE_EMAIL',
          changes: {
            fieldName: 'email',
            oldValue: oldEmail,
            newValue: updatedUser.email,
          },
          status: 'Success',
        },
      });
      return updatedUser;
    } catch (error) {
      await logAuditAction(userId, 'UPDATE_EMAIL', {
        actionDetails: {
          type: 'UPDATE_EMAIL',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  // Assuming endpoints for managing MFA will be added here
  @Post('mfa/enroll')
  async enrollMfa(@Body() mfaDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // MFA enrollment logic
      await this.accountService.enrollMfa(userId, mfaDto);
      await logAuditAction(userId, 'MANAGE_MFA', {
        actionDetails: {
          type: 'MANAGE_MFA',
          details: { action: 'Enroll' },
          status: 'Success',
        },
      });
      return { success: true };
    } catch (error) {
      await logAuditAction(userId, 'MANAGE_MFA', {
        actionDetails: {
          type: 'MANAGE_MFA',
          details: { action: 'Enroll' },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Post('mfa/disable')
  async disableMfa(@Req() req) {
    const userId = req.user.id;
    try {
      // MFA disable logic
      await this.accountService.disableMfa(userId);
      await logAuditAction(userId, 'MANAGE_MFA', {
        actionDetails: {
          type: 'MANAGE_MFA',
          details: { action: 'Disable' },
          status: 'Success',
        },
      });
      return { success: true };
    } catch (error) {
      await logAuditAction(userId, 'MANAGE_MFA', {
        actionDetails: {
          type: 'MANAGE_MFA',
          details: { action: 'Disable' },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  // Add other MFA management endpoints (e.g., /mfa/reset) as needed
}