import type { IQuery } from '@nestjs/cqrs';

export class GetVisaTypeByIdQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}
