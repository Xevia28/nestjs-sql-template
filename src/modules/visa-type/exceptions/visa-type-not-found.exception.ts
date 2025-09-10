import { NotFoundException } from '@nestjs/common';

export class VisaTypeNotFoundException extends NotFoundException {
  constructor(visaTypeId?: string) {
    super(
      visaTypeId
        ? `Visa type with ID '${visaTypeId}' not found`
        : 'Visa type not found',
      'VISA_TYPE_NOT_FOUND',
    );
  }
}
