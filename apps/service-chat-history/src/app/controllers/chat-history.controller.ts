import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

import {
  MessageRepository,
  RoomRepository,
  UserRepository,
} from '../repositories'

@Controller()
export class ChatHistoryController {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @MessagePattern('create_room')
  createRoom(@Payload() data, @Ctx() context: RmqContext) {
    this.roomRepository.save(data)
  }

  @MessagePattern('create_message')
  createMessage(@Payload() data, @Ctx() context: RmqContext) {
    this.messageRepository.save(data)
  }

  @MessagePattern('create_user')
  createUser(@Payload() data, @Ctx() context: RmqContext) {
    this.userRepository.save(data)
  }

  @MessagePattern('get_room')
  getRoom(@Payload() data, @Ctx() context: RmqContext) {
    this.roomRepository.find(data)
  }

  @MessagePattern('get_user_room_meta')
  getUserRoomMeta(@Payload() data, @Ctx() context: RmqContext) {
    this.userRepository.find(data)
  }
}
