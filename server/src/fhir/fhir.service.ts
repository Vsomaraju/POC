import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FhirService {
  private readonly logger = new Logger(FhirService.name);
  private readonly fhirBaseUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.fhirBaseUrl = this.configService.get<string>('FHIR_BASE_URL') || 'https://hapi.fhir.org/baseR4';
    this.logger.log(`FHIR Base URL: ${this.fhirBaseUrl}`);
  }

  /**
   * Get all patients
   */
  async getPatients(limit: number = 10) {
    try {
      const url = `${this.fhirBaseUrl}/Patient?_count=${limit}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/fhir+json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching patients:', error.message);
      throw error;
    }
  }

  /**
   * Get patient by ID
   */
  async getPatientById(id: string) {
    try {
      const url = `${this.fhirBaseUrl}/Patient/${id}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/fhir+json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching patient ${id}:`, error.message);
      throw error;
    }
  }

  /**
   * Search patients by name
   */
  async searchPatients(name: string) {
    try {
      const url = `${this.fhirBaseUrl}/Patient?name=${encodeURIComponent(name)}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/fhir+json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error searching patients:', error.message);
      throw error;
    }
  }

  /**
   * Get observations for a patient
   */
  async getObservations(patientId: string, limit: number = 10) {
    try {
      const url = `${this.fhirBaseUrl}/Observation?patient=${patientId}&_count=${limit}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/fhir+json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching observations:', error.message);
      throw error;
    }
  }

  /**
   * Get all practitioners
   */
  async getPractitioners(limit: number = 10) {
    try {
      const url = `${this.fhirBaseUrl}/Practitioner?_count=${limit}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/fhir+json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching practitioners:', error.message);
      throw error;
    }
  }

  /**
   * Get metadata/capabilities of the FHIR server
   */
  async getMetadata() {
    try {
      const url = `${this.fhirBaseUrl}/metadata`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/fhir+json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching metadata:', error.message);
      throw error;
    }
  }
}

