import { AbstractModule } from 'src/accounts/entities/modules.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ unique: true, length: 3 })
  key: string;
  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async setUpdateKey() {
    const k = this.name.substr(0, 3).toUpperCase();
    this.key = k;
  }
}

@Entity()
export class RoleMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => AbstractModule, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  module: AbstractModule;
  @ManyToOne(() => Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  role: Role;
  @Column({ default: false })
  canRead: boolean;
  @Column({ default: false })
  canWrite: boolean;
}
