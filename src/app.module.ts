import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { LolModule } from './lol/lol.module';

@Module({
  imports: [ScheduleModule.forRoot(), TasksModule, UserModule, LolModule],
})
export class AppModule {}
