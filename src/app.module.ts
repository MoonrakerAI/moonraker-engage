import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { AuthModule } from './auth/auth.module';
// import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config available globally
    }),
    PrismaModule,
    // AuthModule, // To be implemented
    // ChatModule, // To be implemented
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
