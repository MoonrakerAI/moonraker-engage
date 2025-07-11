import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Import the audit logging service

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.locationsService.findAll(userId);
  }

  @Post()
  async create(@Body() createLocationDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      const newLocation = await this.locationsService.create(userId, createLocationDto);
      // Log successful location creation
      await logAuditAction(userId, 'ADD_LOCATION', {
        actionDetails: {
          type: 'ADD_LOCATION',
          target: {
            type: 'Location',
            id: newLocation.id,
          },
          details: {
            locationName: newLocation.locationName,
            isOnline: newLocation.isOnline,
            city: newLocation.city, // Log city for context
          },
          status: 'Success',
        },
      });
      return newLocation;
    } catch (error) {
      // Log failed location creation
      await logAuditAction(userId, 'ADD_LOCATION', {
        actionDetails: {
          type: 'ADD_LOCATION',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLocationDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      const oldLocation = await this.locationsService.findOne(userId, id); // Assuming a findOne method in service
      const updatedLocation = await this.locationsService.update(userId, id, updateLocationDto);

      // Identify changes for logging
      const changes: any = {};
      for (const key in updateLocationDto) {
        if (oldLocation[key] !== updatedLocation[key]) {
          changes[key] = {
            oldValue: oldLocation[key],
            newValue: updatedLocation[key],
          };
        }
      }

      // Log successful location update
      await logAuditAction(userId, 'UPDATE_LOCATION', {
        actionDetails: {
          type: 'UPDATE_LOCATION',
          target: {
            type: 'Location',
            id: updatedLocation.id,
          },
          changes: changes,
          status: 'Success',
        },
      });
      return updatedLocation;
    } catch (error) {
      // Log failed location update
      await logAuditAction(userId, 'UPDATE_LOCATION', {
        actionDetails: {
          type: 'UPDATE_LOCATION',
          target: {
            type: 'Location',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    try {
      const deletedLocation = await this.locationsService.remove(userId, id);
      // Log successful location deletion
      await logAuditAction(userId, 'DELETE_LOCATION', {
        actionDetails: {
          type: 'DELETE_LOCATION',
          target: {
            type: 'Location',
            id: id,
          },
          details: {
            locationName: deletedLocation.locationName, // Log name for context
          },
          status: 'Success',
        },
      });
      return deletedLocation;
    } catch (error) {
      // Log failed location deletion
      await logAuditAction(userId, 'DELETE_LOCATION', {
        actionDetails: {
          type: 'DELETE_LOCATION',
          target: {
            type: 'Location',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }
}