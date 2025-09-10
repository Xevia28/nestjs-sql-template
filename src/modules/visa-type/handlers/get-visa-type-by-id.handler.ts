import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VisaTypeDto } from '../dtos/visa-type.dto.ts';
import { GetVisaTypeByIdQuery } from '../queries/get-visa-type-by-id.query.ts';
import { VisaTypeService } from '../visa-type.service.ts';

@QueryHandler(GetVisaTypeByIdQuery)
export class GetVisaTypeByIdHandler
  implements IQueryHandler<GetVisaTypeByIdQuery>
{
  constructor(private readonly visaTypeService: VisaTypeService) {}

  async execute(query: GetVisaTypeByIdQuery): Promise<VisaTypeDto> {
    const { id } = query;

    return this.visaTypeService.findVisaTypeById(id);
  }
}
