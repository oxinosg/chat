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

After creating user, create chat room by using the username of the receiver as a route param. i.e. `/chat/user1`

## Architecture
 * Client: using socket.io to communicate with the gateway
 * Gateway: using gRPC to connect to the Chat Service
 * Chat Service: using Redis as in-memory for storage only and connects through rabbitmq to Chat History Service for permanent storage
 * Chat History Service: permanent storage using mongodb (or elasticsearch at some point)

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
   - redux: 
     - actions
     - reducers
     - middleware
     - effects
     - selectors
     - types
   - apollo: 
     - containers
     - selectors
 - services: api calls, graphql queries/mutations
 - utils
 - constants
 - context: hocs and context api
 - hooks
 
 #### DDD approach
 
 - core: configuration files for the 3rd party libs (apollo client, etc)
 - component lib: react components. each component is structred as: components/index/styles
   - atoms
   - molecules
   - organisms (error handers etc)
 - components: same as component lib, but for app specific components and
   - organisms
 - store: global state managment related files:
   - redux: 
     - actions
     - reducers
     - middleware
     - effects
     - selectors
     - types
   - apollo: 
     - containers
     - selectors
 - services: api calls, graphql queries/mutations
 - utils: shared utils
 - constants: shared constants
 - context: hocs and context api
 - hooks: shared hooks
 - modules: in most cases represents application pages, also contains an app module which contains app logic (routes, themes, appbar). each page is independent from each other
   - home
     - store: state managment related files:
       - redux: 
         - actions
         - reducers
         - middleware
         - effects
         - selectors
         - types
       - apollo: 
         - containers
         - selectors
     - services: api calls, graphql queries/mutations
     - utils
     - constants
     - context: hocs and context api
     - hooks
     - componentes: organisms, layouts are in component folder
     - Component.ts: page is in top level
     - index.ts
   - routes.tsx
   - index.ts
 
 NOTE: everything in top level (shared components, hooks, utils) must be well documented using storybook, jsdoc

 NOTE: store, services, utils, constants, context, hooks can be split into shared lib if they are not app specific
 
 NOTE: for component development follow atomic design
 for exmplanation [atomic design](https://atomicdesign.bradfrost.com/chapter-2/)
 
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
