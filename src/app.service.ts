import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Patient } from '@prisma/client';
import * as redis from 'redis';

@Injectable()
export class AppService {
  private readonly redisClient: redis.RedisClientType;

  constructor(private readonly prisma: PrismaService) {
    this.redisClient = redis.createClient();
    this.redisClient.connect();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getCachedData(key: string): Promise<any> {
      const data = await this.redisClient.get(key);
      return JSON.parse(data || 'null');
  }

  async setCachedData(key: string, data: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(data));
  }

  async findPatient(id: number): Promise<Patient | null> {
    const cacheKey = `patient:${id}`;
    const cachedData = await this.getCachedData(cacheKey);
    if (cachedData) return cachedData;

    const patient = await this.prisma.patient.findUnique({ where: { id } });
    await this.setCachedData(cacheKey, patient);
    return patient;
  }
}
