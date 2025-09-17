import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PageDto } from '../../common/dto/page.dto.ts';
import { ApiPageResponse } from '../../decorators/api-page-response.decorator.ts';
import { UUIDParam } from '../../decorators/http.decorators.ts';
import { CreateVisaTypeCommand } from './commands/create-visa-type.command.ts';
import { DeleteVisaTypeCommand } from './commands/delete-visa-type.command.ts';
import { UpdateVisaTypeCommand } from './commands/update-visa-type.command.ts';
import { CreateVisaTypeDto } from './dtos/create-visa-type.dto.ts';
import { UpdateVisaTypeDto } from './dtos/update-visa-type.dto.ts';
import { VisaTypePageOptionsDto } from './dtos/visa-type-page-options.dto.ts';
import { VisaTypeDto } from './dtos/visa-type.dto.ts';
import { GetAllVisaTypesQuery } from './queries/get-all-visa-types.query.ts';
import { GetVisaTypeByIdQuery } from './queries/get-visa-type-by-id.query.ts';
import { GetVisaTypeByNameQuery } from './queries/get-visa-type-by-name.query.ts';

@Controller('visa-types')
@ApiTags('Visa Types')
export class VisaTypeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new visa type' })
  @ApiCreatedResponse({
    description: 'Visa type created successfully',
    type: VisaTypeDto,
  })
  async createVisaType(
    @Body() createVisaTypeDto: CreateVisaTypeDto,
  ): Promise<VisaTypeDto> {
    return this.commandBus.execute(
      new CreateVisaTypeCommand(createVisaTypeDto),
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all visa types with pagination and filtering' })
  @ApiPageResponse({
    description: 'Get all visa types',
    type: VisaTypeDto,
  })
  async getAllVisaTypes(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: VisaTypePageOptionsDto,
  ): Promise<PageDto<VisaTypeDto>> {
    return this.queryBus.execute(new GetAllVisaTypesQuery(pageOptionsDto));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get visa type by ID' })
  @ApiOkResponse({
    description: 'Visa type retrieved successfully',
    type: VisaTypeDto,
  })
  async getVisaTypeById(@UUIDParam('id') id: string): Promise<VisaTypeDto> {
    return this.queryBus.execute(new GetVisaTypeByIdQuery(id));
  }

  @Get('name/:name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get visa type by name' })
  @ApiOkResponse({
    description: 'Visa type retrieved successfully',
    type: VisaTypeDto,
  })
  async getVisaTypeByName(@Param('name') name: string): Promise<VisaTypeDto> {
    return this.queryBus.execute(new GetVisaTypeByNameQuery(name));
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update visa type by ID' })
  @ApiOkResponse({
    description: 'Visa type updated successfully',
    type: VisaTypeDto,
  })
  async updateVisaType(
    @UUIDParam('id') id: string,
    @Body() updateVisaTypeDto: UpdateVisaTypeDto,
  ): Promise<VisaTypeDto> {
    return this.commandBus.execute(
      new UpdateVisaTypeCommand(id, updateVisaTypeDto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete visa type by ID' })
  @ApiNoContentResponse({
    description: 'Visa type deleted successfully',
  })
  async deleteVisaType(@UUIDParam('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteVisaTypeCommand(id));
  }
}
