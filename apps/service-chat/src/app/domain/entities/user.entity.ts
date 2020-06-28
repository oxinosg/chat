import { AggregateRoot } from '@nestjs/cqrs'

export class User extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly socketId: string,
    public readonly rooms: string[],
    public readonly blocked: string[],
    public readonly status: string,
  ) {
    super()
  }

  addRoom() {
    // logic
  }

  blockUser() {
    // logic
  }

  verifyUserNotBlocked() {
    // logic
  }
}
