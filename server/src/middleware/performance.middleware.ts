import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PerformanceMiddleware implements NestMiddleware {
  private readonly logger = new Logger(PerformanceMiddleware.name);
  private readonly SLOW_REQUEST_THRESHOLD = 5000; // 5 seconds in milliseconds

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, ip } = req;
    
    // Get user agent for better logging
    const userAgent = req.get('User-Agent') || 'Unknown';
    
    // Log request start
    this.logger.log(`🚀 ${method} ${originalUrl} - Started`, {
      method,
      url: originalUrl,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    });

    // Override res.end to capture response time
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      const statusCode = res.statusCode;
      
      // Log the request completion
      const logData = {
        method,
        url: originalUrl,
        statusCode,
        duration: `${duration}ms`,
        ip,
        userAgent,
        timestamp: new Date().toISOString(),
      };

      if (duration > 5000) {
        // Log slow requests as warnings
        this.logger.warn(`🐌 SLOW REQUEST: ${method} ${originalUrl} took ${duration}ms`, logData);
      } else if (duration > 2000) {
        // Log moderately slow requests as warnings
        this.logger.warn(`⚠️  MODERATE SLOW REQUEST: ${method} ${originalUrl} took ${duration}ms`, logData);
      } else {
        // Log normal requests as debug
        this.logger.debug(`✅ ${method} ${originalUrl} completed in ${duration}ms`, logData);
      }

      // Call the original end method
      originalEnd.call(this, chunk, encoding);
    }.bind(this);

    next();
  }
}
