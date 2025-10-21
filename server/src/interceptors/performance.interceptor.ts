import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PerformanceInterceptor.name);
  private readonly SLOW_REQUEST_THRESHOLD = 5000; // 5 seconds

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, ip } = request;
    const userAgent = request.get('User-Agent') || 'Unknown';

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        const logData = {
          method,
          url: originalUrl,
          statusCode,
          duration: `${duration}ms`,
          ip,
          userAgent,
          timestamp: new Date().toISOString(),
          controller: context.getClass().name,
          handler: context.getHandler().name,
        };

        if (duration > this.SLOW_REQUEST_THRESHOLD) {
          this.logger.warn(
            `🐌 SLOW API CALL: ${method} ${originalUrl} took ${duration}ms`,
            logData,
          );
        } else if (duration > 2000) {
          this.logger.warn(
            `⚠️  MODERATE SLOW API CALL: ${method} ${originalUrl} took ${duration}ms`,
            logData,
          );
        } else {
          this.logger.debug(
            `✅ ${method} ${originalUrl} completed in ${duration}ms`,
            logData,
          );
        }
      }),
    );
  }
}
