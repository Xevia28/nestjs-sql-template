import {
  BooleanFieldOptional,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators';

export class CreateVisaTypeDto {
  @StringField({
    description: 'Visa type name',
    example: 'Tourist Visa',
    maxLength: 100,
  })
  name!: string;

  @StringFieldOptional({
    description: 'Visa type description',
    example: 'For tourism and leisure purposes',
  })
  description?: string;

  //   @ApiProperty({ description: 'Processing time in days', example: 15 })
  //   @IsNumber()
  //   @IsPositive()
  //   @Type(() => Number)
  //   processingTimeDays!: number;

  //   @ApiProperty({ description: 'Validity period in months', example: 6 })
  //   @IsNumber()
  //   @IsPositive()
  //   @Type(() => Number)
  //   validityMonths!: number;

  //   @ApiPropertyOptional({
  //     description: 'Maximum stay duration in days',
  //     example: 90,
  //   })
  //   @IsNumber()
  //   @IsPositive()
  //   @IsOptional()
  //   @Type(() => Number)
  //   maxStayDays?: number;

  //   @ApiProperty({
  //     description: 'Whether visa allows multiple entries',
  //     example: false,
  //   })
  //   @IsBoolean()
  //   @Type(() => Boolean)
  //   isMultipleEntry!: boolean;

  //   @ApiProperty({ description: 'Visa application fee', example: 150.0 })
  //   @IsNumber()
  //   @Min(0)
  //   @Type(() => Number)
  //   fee!: number;

  @BooleanFieldOptional({
    description: 'Whether the visa type is active',
    example: true,
    default: true,
  })
  isActive?: boolean = true;
}
