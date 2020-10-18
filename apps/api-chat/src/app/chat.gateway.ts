import { Inject } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
// import { from, Observable } from 'rxjs'
// import { map } from 'rxjs/operators'
import { Socket } from 'socket.io'
import { ChatService } from '@chat/proto'

import {
  CreateMessageRequest,
  CreateMessageResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  GetUserRequest,
  GetUserResponse,
  GetRoomRequest,
  GetRoomResponse,
} from '@chat/proto'

@WebSocketGateway(4001)
export class ChatGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  private chatService: ChatService

  constructor(@Inject('CHAT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.chatService = this.client.getService('ChatService')
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { userId, roomId, content }: CreateMessageRequest,
  ): Promise<CreateMessageResponse> {
    const res = await this.chatService
      .createMessage({ userId, roomId, content })
      .toPromise()

    socket.to(roomId).emit('message', {
      ...res,
    })

    return res
  }

  @SubscribeMessage('getUserAndRoomMeta')
  async handleUserAndRoomMeta(
    @MessageBody() { userId }: GetUserRequest,
  ): Promise<GetUserResponse> {
    const res = await this.chatService
      .getUserAndRoomMeta({ userId })
      .toPromise()

    return res
  }

  // @SubscribeMessage('getUser')
  // async handleGetUser(@MessageBody() { userId }) {
  //   return await this.chatService.getUser({ userId }).toPromise()
  // }

  @SubscribeMessage('getRoom')
  async handleGetRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId }: GetRoomRequest,
  ): Promise<GetRoomResponse> {
    const res = await this.chatService.getRoom({ roomId }).toPromise()

    socket.leaveAll()
    socket.join(roomId)

    return res
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { members }: CreateRoomRequest,
  ): Promise<CreateRoomResponse> {
    const res = await this.chatService.createRoom({ members }).toPromise()

    const connectedUsers = await this.chatService
      .getUsersConnections({
        userIds: members,
      })
      .toPromise()

    await Promise.all(
      connectedUsers.users.map(async ({ socketId }) => {
        if (socketId !== 'nil') {
          socket.to(socketId).emit('new_room', res)
        }
      }),
    )

    return res
  }

  // @SubscribeMessage('joinRoom')
  // handleJoinRoom(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() { username, room },
  // ): void {
  //   socket.join('room', () => {
  //     const user = userJoin(socket.id, username, room)

  //     socket.emit('message', formatMessage(botName, 'Welcome'))

  //     socket.broadcast
  //       .to(user.room)
  //       .emit(
  //         'message',
  //         formatMessage(botName, `${user.username} has joined the chat`),
  //       )

  //     socket.to(user.room).emit('roomUsers', {
  //       room: user.room,
  //       users: getRoomUsers(user.room),
  //     })
  //   })

  //   return room
  // }

  // @SubscribeMessage('chatMessage')
  // handleChatMessage(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() message: string,
  // ): void {
  //   const user = getCurrentUser(socket.id)

  //   socket.to(user.room).emit('message', formatMessage(user.username, message))
  // }

  afterInit(...args: any[]) {
    // TODO load most common data to redis
  }

  handleConnection(socket: Socket, ...args: any[]) {
    // TODO load metadata and latest messages from each room to redis
    console.log(`Client connected: ${socket.id}`)

    this.chatService
      .createUser({
        userId: socket.handshake.query.user,
        socketId: socket.id,
      })
      .toPromise()
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`)

    this.chatService.userDisconnect({ userId: socket.handshake.query.user })
  }
}
