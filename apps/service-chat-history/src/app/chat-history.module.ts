import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { MessageSchema, RoomSchema, UserSchema } from './schemas'
import {
  MessageRepository,
  RoomRepository,
  UserRepository,
} from './repositories'
import { ChatHistoryController } from './controllers/chat-history.controller'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema,
      },
      {
        name: 'Room',
        schema: RoomSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ChatHistoryController],
  providers: [MessageRepository, RoomRepository, UserRepository],
})
export class ChatHistoryModule {}
