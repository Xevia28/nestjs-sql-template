import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PageDto } from '../../../common/dto/page.dto.ts';
import { VisaTypeDto } from '../dtos/visa-type.dto.ts';
import { GetAllVisaTypesQuery } from '../queries/get-all-visa-types.query.ts';
import { VisaTypeService } from '../visa-type.service.ts';

@QueryHandler(GetAllVisaTypesQuery)
export class GetAllVisaTypesHandler
  implements IQueryHandler<GetAllVisaTypesQuery>
{
  constructor(private readonly visaTypeService: VisaTypeService) {}

  async execute(query: GetAllVisaTypesQuery): Promise<PageDto<VisaTypeDto>> {
    const { pageOptionsDto } = query;

    return this.visaTypeService.findAllVisaTypes(pageOptionsDto);
  }
}
