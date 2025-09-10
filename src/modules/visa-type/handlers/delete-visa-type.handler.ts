import { type ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { DeleteVisaTypeCommand } from '../commands/delete-visa-type.command.ts';
import { VisaTypeService } from '../visa-type.service.ts';

@CommandHandler(DeleteVisaTypeCommand)
export class DeleteVisaTypeHandler
  implements ICommandHandler<DeleteVisaTypeCommand>
{
  constructor(private readonly visaTypeService: VisaTypeService) {}

  async execute(command: DeleteVisaTypeCommand): Promise<void> {
    const { id } = command;

    return this.visaTypeService.deleteVisaType(id);
  }
}
