import {
  BooleanFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators';

export class UpdateVisaTypeDto {
  @StringFieldOptional({
    description: 'Visa type name',
    example: 'Tourist Visa',
    maxLength: 100,
  })
  name?: string;

  @StringFieldOptional({
    description: 'Visa type description',
    example: 'For tourism and leisure purposes',
  })
  description?: string;

  //   @NumberFieldOptional({
  //     description: 'Processing time in days',
  //     example: 15,
  //     isPositive: true,
  //   })
  //   processingTimeDays?: number;

  //   @ApiPropertyOptional({ description: 'Validity period in months', example: 6 })
  //   @IsNumber()
  //   @IsPositive()
  //   @IsOptional()
  //   @Type(() => Number)
  //   validityMonths?: number;

  //   @ApiPropertyOptional({
  //     description: 'Maximum stay duration in days',
  //     example: 90,
  //   })
  //   @IsNumber()
  //   @IsPositive()
  //   @IsOptional()
  //   @Type(() => Number)
  //   maxStayDays?: number;

  //   @ApiPropertyOptional({
  //     description: 'Whether visa allows multiple entries',
  //     example: false,
  //   })
  //   @IsBoolean()
  //   @IsOptional()
  //   @Type(() => Boolean)
  //   isMultipleEntry?: boolean;

  //   @ApiPropertyOptional({ description: 'Visa application fee', example: 150.0 })
  //   @IsNumber()
  //   @Min(0)
  //   @IsOptional()
  //   @Type(() => Number)
  //   fee?: number;

  @BooleanFieldOptional({
    description: 'Whether the visa type is active',
    example: true,
  })
  isActive?: boolean;
}
