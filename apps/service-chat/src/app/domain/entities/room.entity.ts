import { AggregateRoot } from '@nestjs/cqrs'

export class Room extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly members: string[],
    public readonly blocked: string[],
    public readonly typing: string[],
    public readonly seenBy: { [key: string]: string },
  ) {
    super()
  }

  addMember() {
    // logic
  }

  addTyping() {
    // logic
  }

  blockUser() {
    // logic
  }
}
