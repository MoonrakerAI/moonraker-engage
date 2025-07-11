import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Trust proxy for Cloud Run (fixes rate limiting issue)
  app.getHttpAdapter().getInstance().set('trust proxy', true);

  // Security middleware for HIPAA compliance
  app.use(helmet());

  // Rate limiting (now works with trust proxy)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Enable CORS with restrictions
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  const port = parseInt(process.env.PORT || '8080', 10);
  await app.listen(port, '0.0.0.0');

  console.log(`HIPAA Chatbot API running on port ${port}`);
}
bootstrap().catch(console.error);
