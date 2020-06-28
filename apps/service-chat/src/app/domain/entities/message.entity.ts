import { AggregateRoot } from '@nestjs/cqrs'

export class Message extends AggregateRoot {
  public readonly time: string

  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly sender: string,
    public readonly file?: string,
  ) {
    super()

    this.time = new Date().toISOString()
  }

  verifyFile() {
    // logic
  }
}
