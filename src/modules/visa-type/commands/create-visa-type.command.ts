import type { ICommand } from '@nestjs/cqrs';

import { CreateVisaTypeDto } from '../dtos/create-visa-type.dto.ts';

export class CreateVisaTypeCommand implements ICommand {
  constructor(public readonly createVisaTypeDto: CreateVisaTypeDto) {}
}
