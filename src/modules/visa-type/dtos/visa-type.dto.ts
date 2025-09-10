import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  BooleanField,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { VisaTypeEntity } from '../entities/visa-type.entity.ts';

export interface VisaTypeDtoOptions {
  isActive?: boolean;
}

export class VisaTypeDto extends AbstractDto {
  @StringField({ description: 'Visa type name', example: 'Tourist Visa' })
  name!: string;

  @StringFieldOptional({
    description: 'Visa type description',
    example: 'For tourism and leisure purposes',
  })
  description?: string | null;

  //   @ApiProperty({ description: 'Processing time in days', example: 15 })
  //   processingTimeDays!: number;

  //   @ApiProperty({ description: 'Validity period in months', example: 6 })
  //   validityMonths!: number;

  //   @ApiPropertyOptional({
  //     description: 'Maximum stay duration in days',
  //     example: 90,
  //   })
  //   maxStayDays?: number | null;

  //   @ApiProperty({
  //     description: 'Whether visa allows multiple entries',
  //     example: false,
  //   })
  //   isMultipleEntry!: boolean;

  //   @ApiProperty({ description: 'Visa application fee', example: 150.0 })
  //   fee!: number;

  @BooleanField({
    description: 'Whether the visa type is active',
    example: true,
  })
  isActive!: boolean;

  constructor(visaType: VisaTypeEntity, _options?: VisaTypeDtoOptions) {
    super(visaType);
    this.name = visaType.name;
    this.description = visaType.description;
    // this.processingTimeDays = visaType.processingTimeDays;
    // this.validityMonths = visaType.validityMonths;
    // this.maxStayDays = visaType.maxStayDays;
    // this.isMultipleEntry = visaType.isMultipleEntry;
    // this.fee = visaType.fee;
    this.isActive = visaType.isActive;
  }
}
