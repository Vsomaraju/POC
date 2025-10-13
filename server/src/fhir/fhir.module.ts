import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FhirService } from './fhir.service';
import { FhirController } from './fhir.controller';

@Module({
  imports: [HttpModule],
  providers: [FhirService],
  controllers: [FhirController],
  exports: [FhirService],
})
export class FhirModule {}

