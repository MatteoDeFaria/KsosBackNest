import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.switchToHttp().getRequest().url;

    if (url !== '/metrics') this.metricsService.incrementCounter();
    return next.handle();
  }
}
