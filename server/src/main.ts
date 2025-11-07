// Register tsx for TypeScript/JSX support in SSR
if (process.env.NODE_ENV !== 'production') {
  try {
    require('tsx/cjs/api').register({
      loader: 'tsx',
    });
  } catch (e) {
    // tsx not available, will use compiled files
  }
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global API prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS - allow all micro frontend ports
  const allowedOrigins = [
    'http://localhost:4200', // Host app
    'http://localhost:4201', // Patient portal dev
    'http://localhost:4301', // Patient portal preview
    'http://localhost:5173', // Legacy client
    process.env.CORS_ORIGIN,
  ].filter(Boolean);
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();

