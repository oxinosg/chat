import { Module } from '@nestjs/common'

import { ChatGateway } from './chat.gateway'
import { ClientsModule } from '@nestjs/microservices'
import { ClientOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'chat',
    protoPath: join(__dirname, '../../../libs/proto/src/lib/proto/chat.proto'),
  },
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
