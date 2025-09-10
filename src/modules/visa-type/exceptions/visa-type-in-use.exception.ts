import { BadRequestException } from '@nestjs/common';

export class VisaTypeInUseException extends BadRequestException {
  constructor(visaTypeId: string) {
    super(
      `Visa type with ID '${visaTypeId}' cannot be deleted as it is currently in use`,
      'VISA_TYPE_IN_USE',
    );
  }
}
