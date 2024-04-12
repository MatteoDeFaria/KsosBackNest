import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  providers: [PrismaService, TasksService],
})
export class TasksModule {}
