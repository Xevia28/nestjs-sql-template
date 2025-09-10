#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get module name from command line arguments
const moduleName = process.argv[2];

if (!moduleName) {
  console.error(
    'Please provide a module name: node scripts/generate-module.js <module-name>',
  );
  process.exit(1);
}

// Convert to different cases
const pascalCase = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const kebabCase = moduleName.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2');

// Create module directory
const moduleDir = path.join('src', 'modules', kebabCase);
if (!fs.existsSync(moduleDir)) {
  fs.mkdirSync(moduleDir, { recursive: true });
}

// Template for entity (without translations)
const entityTemplate = `import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { UserEntity } from '../user/user.entity.ts';
import { ${pascalCase}Dto } from './dtos/${kebabCase}.dto.ts';

@Entity({ name: '${kebabCase}s' })
@UseDto(${pascalCase}Dto)
export class ${pascalCase}Entity extends AbstractEntity<${pascalCase}Dto> {
  @Column({ type: 'uuid' })
  userId!: Uuid;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.${kebabCase}s, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<UserEntity>;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
`;

// Template for DTO
const dtoTemplate = `import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import type { ${pascalCase}Entity } from '../${kebabCase}.entity.ts';

export class ${pascalCase}Dto extends AbstractDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  constructor(${moduleName}Entity: ${pascalCase}Entity) {
    super(${moduleName}Entity);
    this.name = ${moduleName}Entity.name;
    this.description = ${moduleName}Entity.description;
  }
}
`;

// Template for service
const serviceTemplate = `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ${pascalCase}Entity } from './${kebabCase}.entity.ts';

@Injectable()
export class ${pascalCase}Service {
  constructor(
    @InjectRepository(${pascalCase}Entity)
    private ${moduleName}Repository: Repository<${pascalCase}Entity>,
  ) {}

  async findAll(): Promise<${pascalCase}Entity[]> {
    return this.${moduleName}Repository.find();
  }

  async findOne(id: string): Promise<${pascalCase}Entity | null> {
    return this.${moduleName}Repository.findOne({ where: { id } });
  }

  async create(data: Partial<${pascalCase}Entity>): Promise<${pascalCase}Entity> {
    const entity = this.${moduleName}Repository.create(data);
    return this.${moduleName}Repository.save(entity);
  }

  async update(id: string, data: Partial<${pascalCase}Entity>): Promise<${pascalCase}Entity | null> {
    await this.${moduleName}Repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.${moduleName}Repository.delete(id);
  }
}
`;

// Template for controller
const controllerTemplate = `import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ${pascalCase}Service } from './${kebabCase}.service.ts';
import { ${pascalCase}Dto } from './dtos/${kebabCase}.dto.ts';
import { ${pascalCase}Entity } from './${kebabCase}.entity.ts';

@Controller('${kebabCase}s')
@ApiTags('${kebabCase}s')
export class ${pascalCase}Controller {
  constructor(private readonly ${moduleName}Service: ${pascalCase}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get all ${kebabCase}s' })
  @ApiResponse({ status: 200, description: 'Return all ${kebabCase}s.', type: [${pascalCase}Dto] })
  async findAll(): Promise<${pascalCase}Dto[]> {
    const entities = await this.${moduleName}Service.findAll();
    return entities.map(entity => entity.toDto());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ${kebabCase} by id' })
  @ApiResponse({ status: 200, description: 'Return the ${kebabCase}.', type: ${pascalCase}Dto })
  async findOne(@Param('id') id: string): Promise<${pascalCase}Dto | null> {
    const entity = await this.${moduleName}Service.findOne(id);
    return entity?.toDto() || null;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ${kebabCase}' })
  @ApiResponse({ status: 201, description: 'The ${kebabCase} has been created.', type: ${pascalCase}Dto })
  async create(@Body() data: Partial<${pascalCase}Entity>): Promise<${pascalCase}Dto> {
    const entity = await this.${moduleName}Service.create(data);
    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ${kebabCase}' })
  @ApiResponse({ status: 200, description: 'The ${kebabCase} has been updated.', type: ${pascalCase}Dto })
  async update(@Param('id') id: string, @Body() data: Partial<${pascalCase}Entity>): Promise<${pascalCase}Dto | null> {
    const entity = await this.${moduleName}Service.update(id, data);
    return entity?.toDto() || null;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ${kebabCase}' })
  @ApiResponse({ status: 200, description: 'The ${kebabCase} has been deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.${moduleName}Service.remove(id);
  }
}
`;

// Template for module
const moduleTemplate = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ${pascalCase}Controller } from './${kebabCase}.controller.ts';
import { ${pascalCase}Entity } from './${kebabCase}.entity.ts';
import { ${pascalCase}Service } from './${kebabCase}.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([${pascalCase}Entity])],
  controllers: [${pascalCase}Controller],
  providers: [${pascalCase}Service],
  exports: [${pascalCase}Service],
})
export class ${pascalCase}Module {}
`;

// Create files
const files = [
  { path: `${kebabCase}.entity.ts`, content: entityTemplate },
  { path: `${kebabCase}.service.ts`, content: serviceTemplate },
  { path: `${kebabCase}.controller.ts`, content: controllerTemplate },
  { path: `${kebabCase}.module.ts`, content: moduleTemplate },
];

// Additional DTO templates
const createDtoTemplate = `import { StringField } from '../../../decorators/field.decorators.ts';

export class Create${pascalCase}Dto {
  @StringField()
  name!: string;

  @StringField({ required: false })
  description?: string;
}
`;

const updateDtoTemplate = `export class Update${pascalCase}Dto {}
`;

const pageOptionsDtoTemplate = `import { PageOptionsDto } from '../../../common/dto/page-options.dto.ts';

export class ${pascalCase}PageOptionsDto extends PageOptionsDto {}
`;

// Create DTOs directory and DTO files
const dtoDir = path.join(moduleDir, 'dtos');
if (!fs.existsSync(dtoDir)) {
  fs.mkdirSync(dtoDir, { recursive: true });
}

const dtoFiles = [
  { name: `${kebabCase}.dto.ts`, content: dtoTemplate },
  { name: `create-${kebabCase}.dto.ts`, content: createDtoTemplate },
  { name: `update-${kebabCase}.dto.ts`, content: updateDtoTemplate },
  { name: `${kebabCase}-page-options.dto.ts`, content: pageOptionsDtoTemplate },
];

dtoFiles.forEach((file) => {
  fs.writeFileSync(path.join(dtoDir, file.name), file.content);
});

// Create main module files
files.forEach((file) => {
  fs.writeFileSync(path.join(moduleDir, file.path), file.content);
});

console.log(`✅ Module '${moduleName}' generated successfully in ${moduleDir}`);
console.log(`📁 Generated files:`);
console.log(`   - ${kebabCase}.entity.ts`);
console.log(`   - ${kebabCase}.service.ts`);
console.log(`   - ${kebabCase}.controller.ts`);
console.log(`   - ${kebabCase}.module.ts`);
console.log(`   - dtos/${kebabCase}.dto.ts`);
console.log(`   - dtos/create-${kebabCase}.dto.ts`);
console.log(`   - dtos/update-${kebabCase}.dto.ts`);
console.log(`   - dtos/${kebabCase}-page-options.dto.ts`);
console.log(`\n🔧 Don't forget to:`);
console.log(`   1. Add ${pascalCase}Module to your app.module.ts imports`);
console.log(`   2. Run database migrations if needed`);
console.log(
  `   3. Update UserEntity to include ${kebabCase}s relationship if needed`,
);
