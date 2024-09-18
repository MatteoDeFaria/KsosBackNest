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
    this.metricsService.incrementCounter();
    console.log(context.getType)
    return next.handle();
  }
}
