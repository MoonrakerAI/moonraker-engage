import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Import the audit logging service

@Controller('services')
@UseGuards(JwtAuthGuard)
export class ServicesController