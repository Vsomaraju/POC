import { Controller, Get, Res, Req, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { SsrService } from './ssr.service';

@Controller()
export class SsrController {
  private readonly logger = new Logger(SsrController.name);

  constructor(private readonly ssrService: SsrService) {}

  @Get('patient-portal*')
  async renderPatientPortal(@Req() req: Request, @Res() res: Response) {
    // Skip API routes
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).send('Not Found');
    }

    try {
      const url = req.originalUrl.replace('/patient-portal', '') || '/';
      const html = await this.ssrService.renderPatientPortal(url);
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      this.logger.error('Error rendering patient-portal:', error);
      res.status(500).send('Error rendering page');
    }
  }

  @Get('*')
  async renderHost(@Req() req: Request, @Res() res: Response) {
    // Skip API routes
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).send('Not Found');
    }

    try {
      const html = await this.ssrService.renderHost(req.originalUrl || '/');
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      this.logger.error('Error rendering host:', error);
      res.status(500).send('Error rendering page');
    }
  }
}

