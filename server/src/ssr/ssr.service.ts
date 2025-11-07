import { Injectable, Logger } from '@nestjs/common';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SsrService {
  private readonly logger = new Logger(SsrService.name);

  private async loadModule(modulePath: string) {
    try {
      // In development, try to use tsx to load TypeScript/JSX files
      if (process.env.NODE_ENV !== 'production') {
        try {
          const sourcePath = join(process.cwd(), modulePath);
          if (existsSync(sourcePath)) {
            // Use dynamic import with tsx loader (registered in main.ts)
            return await import(sourcePath);
          }
        } catch (tsxError) {
          this.logger.warn('Failed to load with tsx, trying compiled version');
        }
      }
      
      // Try to load from dist (for production or if tsx fails)
      const distPath = join(process.cwd(), 'dist', 'apps', modulePath.replace('apps/', '').replace('.tsx', '.js'));
      if (existsSync(distPath)) {
        return await import(distPath);
      }
      
      // Fallback: try source path directly
      const sourcePath = join(process.cwd(), modulePath);
      if (existsSync(sourcePath)) {
        return await import(sourcePath);
      }
      
      throw new Error(`Module not found: ${modulePath}`);
    } catch (error) {
      this.logger.error(`Error loading module ${modulePath}:`, error);
      throw error;
    }
  }

  private getTemplate(appName: 'patient-portal' | 'host'): string {
    // Try dist first (production)
    const distPath = join(process.cwd(), 'dist', 'apps', appName, 'index.html');
    if (existsSync(distPath)) {
      try {
        return readFileSync(distPath, 'utf-8');
      } catch (error) {
        this.logger.warn(`Error reading template from dist: ${error}`);
      }
    }

    // Try source (development)
    const sourcePath = join(process.cwd(), 'apps', appName, 'index.html');
    if (existsSync(sourcePath)) {
      try {
        return readFileSync(sourcePath, 'utf-8');
      } catch (error) {
        this.logger.warn(`Error reading template from source: ${error}`);
      }
    }

    this.logger.warn(`Template not found for ${appName}, using fallback`);
    return this.getFallbackTemplate(appName);
  }

  private getFallbackTemplate(appName: 'patient-portal' | 'host'): string {
    const title = appName === 'patient-portal' ? 'Patient Portal - FHIR POC' : 'FHIR POC';
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"><!-- SSR_CONTENT --></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  }

  async renderPatientPortal(url: string): Promise<string> {
    try {
      const renderModule = await this.loadModule('apps/patient-portal/src/entry-server.tsx');
      const { html } = renderModule.render(url);
      const template = this.getTemplate('patient-portal');
      
      // Replace the root div content with SSR HTML
      return template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                     .replace('<div id="root"><!-- SSR_CONTENT --></div>', `<div id="root">${html}</div>`);
    } catch (error) {
      this.logger.error('Error rendering patient-portal:', error);
      // Return template without SSR content as fallback
      const template = this.getTemplate('patient-portal');
      return template.replace('<div id="root"></div>', '<div id="root"></div>');
    }
  }

  async renderHost(url: string): Promise<string> {
    try {
      const renderModule = await this.loadModule('apps/host/src/entry-server.tsx');
      const { html } = renderModule.render(url);
      const template = this.getTemplate('host');
      
      // Replace the root div content with SSR HTML
      return template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                     .replace('<div id="root"><!-- SSR_CONTENT --></div>', `<div id="root">${html}</div>`);
    } catch (error) {
      this.logger.error('Error rendering host:', error);
      // Return template without SSR content as fallback
      const template = this.getTemplate('host');
      return template.replace('<div id="root"></div>', '<div id="root"></div>');
    }
  }
}

