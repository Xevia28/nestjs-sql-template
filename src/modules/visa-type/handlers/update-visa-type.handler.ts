import { type ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { UpdateVisaTypeCommand } from '../commands/update-visa-type.command.ts';
import { VisaTypeDto } from '../dtos/visa-type.dto.ts';
import { VisaTypeService } from '../visa-type.service.ts';

@CommandHandler(UpdateVisaTypeCommand)
export class UpdateVisaTypeHandler
  implements ICommandHandler<UpdateVisaTypeCommand>
{
  constructor(private readonly visaTypeService: VisaTypeService) {}

  async execute(command: UpdateVisaTypeCommand): Promise<VisaTypeDto> {
    const { id, updateVisaTypeDto } = command;

    return this.visaTypeService.updateVisaType(id, updateVisaTypeDto);
  }
}
