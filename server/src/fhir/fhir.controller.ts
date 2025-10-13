import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FhirService } from './fhir.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('fhir')
@UseGuards(JwtAuthGuard)
export class FhirController {
  constructor(private fhirService: FhirService) {}

  @Get('metadata')
  async getMetadata() {
    return this.fhirService.getMetadata();
  }

  @Get('patients')
  async getPatients(@Query('limit') limit: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.fhirService.getPatients(limitNum);
  }

  @Get('patients/search')
  async searchPatients(@Query('name') name: string) {
    return this.fhirService.searchPatients(name);
  }

  @Get('patients/:id')
  async getPatientById(@Param('id') id: string) {
    return this.fhirService.getPatientById(id);
  }

  @Get('patients/:id/observations')
  async getObservations(
    @Param('id') id: string,
    @Query('limit') limit: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.fhirService.getObservations(id, limitNum);
  }

  @Get('practitioners')
  async getPractitioners(@Query('limit') limit: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.fhirService.getPractitioners(limitNum);
  }
}

