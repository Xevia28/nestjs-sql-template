import type { IQuery } from '@nestjs/cqrs';

export class GetVisaTypeByNameQuery implements IQuery {
  constructor(public readonly name: string) {}
}
