import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { FhirModule } from './fhir/fhir.module';
import { UsersModule } from './users/users.module';
import { SsrModule } from './ssr/ssr.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerformanceMiddleware } from './middleware/performance.middleware';
import { PerformanceInterceptor } from './interceptors/performance.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    FhirModule,
    SsrModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PerformanceMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}

