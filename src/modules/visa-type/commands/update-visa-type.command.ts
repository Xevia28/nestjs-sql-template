import type { ICommand } from '@nestjs/cqrs';

import { UpdateVisaTypeDto } from '../dtos/update-visa-type.dto.ts';

export class UpdateVisaTypeCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly updateVisaTypeDto: UpdateVisaTypeDto,
  ) {}
}
