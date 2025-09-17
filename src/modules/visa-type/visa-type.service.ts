import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { PageMetaDto } from '../../common/dto/page-meta.dto.ts';
import { PageDto } from '../../common/dto/page.dto.ts';
import { CreateVisaTypeDto } from './dtos/create-visa-type.dto.ts';
import { UpdateVisaTypeDto } from './dtos/update-visa-type.dto.ts';
import { VisaTypePageOptionsDto } from './dtos/visa-type-page-options.dto.ts';
import { VisaTypeDto } from './dtos/visa-type.dto.ts';
import { VisaTypeEntity } from './entities/visa-type.entity.ts';
import { VisaTypeAlreadyExistsException } from './exceptions/visa-type-already-exists.exception.ts';
import { VisaTypeNameNotFoundException } from './exceptions/visa-type-name-not-found.exception.ts';
import { VisaTypeNotFoundException } from './exceptions/visa-type-not-found.exception.ts';

@Injectable()
export class VisaTypeService {
  constructor(
    @InjectRepository(VisaTypeEntity)
    private readonly visaTypeRepository: Repository<VisaTypeEntity>,
  ) {}

  async getCount(): Promise<number> {
    return this.visaTypeRepository.count();
  }

  async createVisaType(
    createVisaTypeDto: CreateVisaTypeDto,
  ): Promise<VisaTypeDto> {
    try {
      const visaTypeEntity = this.visaTypeRepository.create({
        ...createVisaTypeDto,
        isActive: createVisaTypeDto.isActive ?? true,
      });
      const savedVisaType = await this.visaTypeRepository.save(visaTypeEntity);
      return savedVisaType.toDto();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes('Duplicate')) {
          throw new VisaTypeAlreadyExistsException(createVisaTypeDto.name);
        }
      }
      throw error;
    }
  }

  async findAllVisaTypes(
    pageOptionsDto: VisaTypePageOptionsDto,
  ): Promise<PageDto<VisaTypeDto>> {
    const qb = this.visaTypeRepository
      .createQueryBuilder('visaType')
      .orderBy('visaType.createdAt', pageOptionsDto.order);

    if (pageOptionsDto.name?.trim()) {
      qb.andWhere('LOWER(visaType.name) LIKE :name', {
        name: `%${pageOptionsDto.name.toLowerCase()}%`,
      });
    }

    if (pageOptionsDto.isActive !== undefined) {
      qb.andWhere('visaType.isActive = :isActive', {
        isActive: pageOptionsDto.isActive,
      });
    }

    const [entities, itemCount] = await qb
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities.toDtos(), pageMetaDto);
  }

  async findVisaTypeById(id: string): Promise<VisaTypeDto> {
    const visaType = await this.visaTypeRepository.findOne({
      where: { id },
    });

    if (!visaType) {
      throw new VisaTypeNotFoundException(id);
    }

    return visaType.toDto();
  }

  async checkVisaTypeByName(name: string): Promise<VisaTypeEntity | null> {
    return await this.visaTypeRepository.findOne({
      where: { name },
    });
  }

  async findVisaTypeByName(name: string): Promise<VisaTypeDto> {
    const visaType = await this.visaTypeRepository.findOne({
      where: { name },
    });

    if (!visaType) {
      throw new VisaTypeNameNotFoundException(name);
    }

    return visaType.toDto();
  }

  async updateVisaType(
    id: string,
    updateVisaTypeDto: UpdateVisaTypeDto,
  ): Promise<VisaTypeDto> {
    const visaType = await this.visaTypeRepository.findOne({
      where: { id },
    });

    if (!visaType) {
      throw new VisaTypeNotFoundException(id);
    }

    // Check if name is being updated and if it conflicts with existing visa type
    if (updateVisaTypeDto.name && updateVisaTypeDto.name !== visaType.name) {
      const existingVisaType = await this.visaTypeRepository.findOne({
        where: { name: updateVisaTypeDto.name },
      });

      if (existingVisaType) {
        throw new VisaTypeAlreadyExistsException(updateVisaTypeDto.name);
      }
    }

    Object.assign(visaType, updateVisaTypeDto);
    const updatedVisaType = await this.visaTypeRepository.save(visaType);

    return updatedVisaType.toDto();
  }

  async deleteVisaType(id: string): Promise<void> {
    const visaType = await this.visaTypeRepository.findOne({
      where: { id },
    });

    if (!visaType) {
      throw new VisaTypeNotFoundException(id);
    }

    await this.visaTypeRepository.remove(visaType);
  }

  async toggleVisaTypeStatus(id: string): Promise<VisaTypeDto> {
    const visaType = await this.visaTypeRepository.findOne({
      where: { id },
    });

    if (!visaType) {
      throw new VisaTypeNotFoundException(id);
    }

    visaType.isActive = !visaType.isActive;

    const updatedVisaType = await this.visaTypeRepository.save(visaType);

    return updatedVisaType.toDto();
  }
}
