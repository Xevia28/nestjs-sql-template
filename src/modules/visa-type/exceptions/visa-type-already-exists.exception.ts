import { ConflictException } from '@nestjs/common';

export class VisaTypeAlreadyExistsException extends ConflictException {
  constructor(name: string) {
    super(
      `Visa type with name '${name}' already exists`,
      'VISA_TYPE_ALREADY_EXISTS',
    );
  }
}
