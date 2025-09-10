import { PageOptionsDto } from '../../../common/dto/page-options.dto.ts';
import {
  BooleanFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class VisaTypePageOptionsDto extends PageOptionsDto {
  @StringFieldOptional({ description: 'Filter by visa type name' })
  readonly name?: string;

  @BooleanFieldOptional({ description: 'Filter by active status' })
  readonly isActive?: boolean;

  //   @BooleanFieldOptional({ description: 'Filter by multiple entry capability' })
  //   readonly isMultipleEntry?: boolean;
}
