import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VisaTypeDto } from '../dtos/visa-type.dto.ts';
import { GetVisaTypeByNameQuery } from '../queries/get-visa-type-by-name.query.ts';
import { VisaTypeService } from '../visa-type.service.ts';

@QueryHandler(GetVisaTypeByNameQuery)
export class GetVisaTypeByNameHandler
  implements IQueryHandler<GetVisaTypeByNameQuery>
{
  constructor(private readonly visaTypeService: VisaTypeService) {}

  async execute(query: GetVisaTypeByNameQuery): Promise<VisaTypeDto | null> {
    const { name } = query;

    return this.visaTypeService.findVisaTypeByName(name);
  }
}
