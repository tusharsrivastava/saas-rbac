import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractUser } from './abstractusers.entity';

export enum AccountType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, length: 100 })
  name: string;
  @Column({ length: 10 })
  accountType: AccountType;
  @ManyToOne(() => AbstractUser, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  accountOwner: AbstractUser;
}
