import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'
import { grpcClientOptions } from './app/grpc-client.options'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule)
  // app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'chat',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // })

  // await app.startAllMicroservicesAsync()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcClientOptions,
  )
  await app.listenAsync()
}

bootstrap()
