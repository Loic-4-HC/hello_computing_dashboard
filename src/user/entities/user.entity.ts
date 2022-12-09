import { CreateAdresseDto } from '../dto/create-user.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
  })
  firstName = '';

  @Column({
    name: 'last_name',
    type: 'varchar',
    default: '',
  })
  lastName = '';

  @Column({
    name: 'full_name',
    type: 'varchar',
    default: '',
  })
  fullName = `${this.firstName} ${this.lastName}`;

  @Column({
    name: 'profil_img',
  })
  profilImage: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'adresse',
    type: 'varchar',
    nullable: true,
  })
  adresse: CreateAdresseDto;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAkMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updatedAt: Date;
}
