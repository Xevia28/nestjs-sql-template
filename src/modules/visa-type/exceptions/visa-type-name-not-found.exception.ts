import { NotFoundException } from '@nestjs/common';

export class VisaTypeNameNotFoundException extends NotFoundException {
  constructor(visaTypeName?: string) {
    super(
      visaTypeName
        ? `Visa type with name '${visaTypeName}' not found`
        : 'Visa type not found',
      'VISA_TYPE_NOT_FOUND',
    );
  }
}
