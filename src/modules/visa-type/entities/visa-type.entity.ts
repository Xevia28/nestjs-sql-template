import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { VisaTypeDto, type VisaTypeDtoOptions } from '../dtos/visa-type.dto.ts';

@Entity({ name: 'visa_types' })
@UseDto(VisaTypeDto)
export class VisaTypeEntity extends AbstractEntity<
  VisaTypeDto,
  VisaTypeDtoOptions
> {
  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  // @OneToMany(
  //   () => VisaApplicationEntity,
  //   (visaApplicationEntity) => visaApplicationEntity.visaType,
  // )
  // visaApplications!: Relation<VisaApplicationEntity[]>;
}
