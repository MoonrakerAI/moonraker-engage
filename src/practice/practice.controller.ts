import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Assuming the audit service path

@Controller('practice')
@UseGuards(JwtAuthGuard)
export class PracticeController {
  constructor(private practiceService: PracticeService) {}

  @Post('info') // Assuming a POST or PUT endpoint for updates
  async updatePracticeInfo(@Body() updateDto: any, @Req() req) {
    const userId = req.user.id; // Get user ID from authenticated request
    let oldPracticeInfo: any;

    try {
      // Fetch the old practice info before updating
      oldPracticeInfo = await this.practiceService.getPracticeInfo(userId);

      // Update practice info logic here
      const updatedPracticeInfo = await this.practiceService.updatePracticeInfo(userId, updateDto);

      // Log the successful update
      const changes: any = {};
      // Compare old and new data to identify changes
      for (const key in updateDto) {
        if (updateDto.hasOwnProperty(key) && oldPracticeInfo.hasOwnProperty(key)) {
          if (oldPracticeInfo[key] !== updatedPracticeInfo[key]) {
            changes[key] = {
              oldValue: oldPracticeInfo[key],
              newValue: updatedPracticeInfo[key],
            };
          }
        }
      }

      await logAuditAction(userId, 'UPDATE_PRACTICE_INFO', {
        actionDetails: {
          type: 'UPDATE_PRACTICE_INFO',
          target: { type: 'PracticeInfo' },
          changes: changes,
          status: 'Success',
        },
      });

      return updatedPracticeInfo;
    } catch (error) {
      // Log the failed update
      await logAuditAction(userId, 'UPDATE_PRACTICE_INFO', {
        actionDetails: {
          type: 'UPDATE_PRACTICE_INFO',
          target: { type: 'PracticeInfo' },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }
}