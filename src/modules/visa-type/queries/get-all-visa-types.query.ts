import type { IQuery } from '@nestjs/cqrs';

import { VisaTypePageOptionsDto } from '../dtos/visa-type-page-options.dto.ts';

export class GetAllVisaTypesQuery implements IQuery {
  constructor(public readonly pageOptionsDto: VisaTypePageOptionsDto) {}
}
