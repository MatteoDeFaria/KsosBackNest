import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Inject } from '@nestjs/common';
import { register } from 'prom-client';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor() {}

  @Get()
  async getMetrics() {
    return await register.metrics();
  }
}
