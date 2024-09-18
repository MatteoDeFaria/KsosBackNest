import { Injectable, Inject } from '@nestjs/common';
import { Counter, Gauge, register, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly counter: Counter[] = [];

  constructor() {
    const requestCounter = new Counter({
      name: 'nestjs_ksos_total_requests',
      help: 'Total number of requests to the NestJS app',
    });
    register.clear()
    register.registerMetric(requestCounter);
    this.counter.push(requestCounter);
  }

  incrementCounter(): void {
    this.counter[0].inc();
  }

  async getCounter(): Promise<Counter[]> {
    return this.counter;
  }
}
