import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz', //date_time_with_timezone
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz', //date_time_with_timezone
    nullable: true,
  })
  updatedAt: Date;
}
