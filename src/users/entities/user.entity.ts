import { IsEmail, IsEnum } from 'class-validator';
import { BaseCommonEntity } from 'src/common/base-common.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../enums/users.enum';

@Entity()
export class UserEntity extends BaseCommonEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  registeredDate: Date;

  @Column()
  expirationDate: Date;

  @Column()
  @IsEnum(Role)
  role: Role;
}
