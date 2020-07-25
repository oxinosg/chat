# Chat

## Description

Proof of concept of a scalable microservice architecture using DDD / CQRS / Repository pattern

Tech Stack: Nestjs, Typescript, Redis, gRPC, Socket.io, Nx, Pm2, RabbitMQ, MongoDB

## Intallation
```bash
yarn install
yarn global pm2 @nrwl/cli

docker run -d -p 6379:6379 redis

yarn start:build-all
yarn start:prod-all
```

### Usage

Visit address and create user `http://localhost:4200/`
After creating user, create chat room by using the username of the receiver as a route param. i.e. `/chat/user1`

## Architecture
 * Client: using socket.io to communicate with the gateway
 * Gateway: using gRPC to connect to the Chat Service
 * Chat Service: using Redis as in-memory for storage only and connects through rabbitmq to Chat History Service for permanent storage
 * Chat History Service: permanent storage using mongodb (or elasticsearch at some point)
 * Notification Service

### Chat Service 
 - application
   - commands
   - controllers
   - events
   - queries
   - sagas
 - domain
   - entities
   - contracts
 - infrastucture
   - repositories

### Chat History Service 

### Client Structure
 - core: configuration files for the 3rd party libs (apollo client, etc)
 - components: react components. each component is structred as: components/index/styles
 - pages: represents application pages. each page is independent from each other and is structed like a component. (also includes routes)
 - store: state managment related files:
   - redux: actions/reducers/selectors/effects/types
   - apollo: containers/selectors
 - services: api calls, graphql queries/mutations
 - utils
 - constants
 - context: hocs and context api
 - hooks
 
### Contract Lib 
  
Library containing contract interfaces from each service

### Proto Lib 
  
Library containing proto files and ts interfaces for grpc

### Resources
 - [Tackle Business Complexity in a Microservice with DDD and CQRS Patterns](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/)
 - [Clean Architecture Talk by Jason Taylor](https://www.youtube.com/watch?v=dK4Yb6-LxAk)
 - [Exploring CQRS and Event Sourcing](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/jj554200(v=pandp.10))
 - [Nestjs gRPC](https://docs.nestjs.com/microservices/grpc)
 - [Nestjs CQRS](https://docs.nestjs.com/recipes/cqrs)
 - [Building Microservices: Using Node.js with DDD, CQRS, and Event Sourcing](https://medium.com/@qasimsoomro/building-microservices-using-node-js-with-ddd-cqrs-and-event-sourcing-part-1-of-2-52e0dc3d81df)
