import type { ICommand } from '@nestjs/cqrs';

export class DeleteVisaTypeCommand implements ICommand {
  constructor(public readonly id: string) {}
}
