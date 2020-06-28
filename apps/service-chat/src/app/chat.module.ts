import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RedisModule } from '@svtslv/nestjs-ioredis'

import { ChatController } from './application/controllers/chat.controller'
import { CommandHandlers } from './application/commands'
import { QueryHandlers } from './application/queries'
import { EventHandlers } from './application/events'
// import { ChatSagas } from './application/sagas/chat.sagas'
import { RedisRepository } from './infrastucture/repository/chat.repository'

@Module({
  imports: [
    CqrsModule,
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379',
      },
    }),
  ],
  controllers: [ChatController],
  providers: [
    // ChatSagas,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    RedisRepository,
  ],
})
export class ChatModule {}
