import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any, @Req() req) {
    try {
      const user = await this.authService.login(loginDto);
      // Log successful login
      await logAuditAction(user.id, 'LOGIN', { actionDetails: { type: 'LOGIN', status: 'Success' } });
      return user;
    } catch (error) {
      // Log failed login
      await logAuditAction(null, 'LOGIN', {
        actionDetails: {
          type: 'LOGIN',
          status: 'Failure',
          details: { emailAttempted: loginDto.email },
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout') // Using GET for simplicity, consider POST for production
  async logout(@Req() req) {
    const userId = req.user.id; // Assuming user ID is available from the authenticated request
    // Log logout
    await logAuditAction(userId, 'LOGOUT', { actionDetails: { type: 'LOGOUT', status: 'Success' } });
    // You may need to invalidate the user's session or token here
    return { message: 'Logout successful' };
  }
}