import { Module } from '@nestjs/common'
import { ChatHistoryModule } from './chat-history.module'

@Module({
  imports: [ChatHistoryModule],
})
export class AppModule {}
