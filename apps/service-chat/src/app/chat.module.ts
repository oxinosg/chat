import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RedisModule } from '@svtslv/nestjs-ioredis'
import { ClientsModule, Transport } from '@nestjs/microservices'

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
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672/hello'],
          queue: 'chat',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
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
