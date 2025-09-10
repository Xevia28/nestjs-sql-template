import { type ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { CreateVisaTypeCommand } from '../commands/create-visa-type.command.ts';
import { VisaTypeDto } from '../dtos/visa-type.dto.ts';
import { VisaTypeService } from '../visa-type.service.ts';

@CommandHandler(CreateVisaTypeCommand)
export class CreateVisaTypeHandler
  implements ICommandHandler<CreateVisaTypeCommand>
{
  constructor(private readonly visaTypeService: VisaTypeService) {}

  async execute(command: CreateVisaTypeCommand): Promise<VisaTypeDto> {
    const { createVisaTypeDto } = command;

    return this.visaTypeService.createVisaType(createVisaTypeDto);
  }
}
