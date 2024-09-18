import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { LolModule } from './lol/lol.module';
import { MetricsModule } from './metrics/metrics.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from './request/request.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
  ],
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    UserModule,
    LolModule,
    MetricsModule,
  ],
})
export class AppModule {}
