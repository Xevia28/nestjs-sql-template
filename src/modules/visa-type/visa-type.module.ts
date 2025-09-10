import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VisaTypeEntity } from './entities/visa-type.entity.ts';
import { CreateVisaTypeHandler } from './handlers/create-visa-type.handler.ts';
import { DeleteVisaTypeHandler } from './handlers/delete-visa-type.handler.ts';
import { GetAllVisaTypesHandler } from './handlers/get-all-visa-types.handler.ts';
import { GetVisaTypeByIdHandler } from './handlers/get-visa-type-by-id.handler.ts';
import { GetVisaTypeByNameHandler } from './handlers/get-visa-type-by-name.handler.ts';
import { UpdateVisaTypeHandler } from './handlers/update-visa-type.handler.ts';
import { VisaTypeController } from './visa-type.controller.ts';
import { VisaTypeService } from './visa-type.service.ts';

const CommandHandlers = [
  CreateVisaTypeHandler,
  UpdateVisaTypeHandler,
  DeleteVisaTypeHandler,
];

const QueryHandlers = [
  GetAllVisaTypesHandler,
  GetVisaTypeByIdHandler,
  GetVisaTypeByNameHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([VisaTypeEntity])],
  controllers: [VisaTypeController],
  providers: [VisaTypeService, ...CommandHandlers, ...QueryHandlers],
  exports: [VisaTypeService],
})
export class VisaTypeModule {}
