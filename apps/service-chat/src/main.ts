import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app/app.module'
import { grpcClientOptions } from './app/grpc-client.options'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcClientOptions,
  )
  await app.listenAsync()
}

bootstrap()
