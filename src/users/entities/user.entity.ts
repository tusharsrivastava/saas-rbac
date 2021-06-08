import {
  BeforeInsert,
  BeforeUpdate,
  ChildEntity,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/global.constants';
import { AbstractUser } from 'src/accounts/entities/abstractusers.entity';
import { Role } from 'src/rbac/entities/roles.entity';

const saltOrRounds = SALT_OR_ROUNDS;

@ChildEntity()
export class User extends AbstractUser {
  @Column()
  username: string;

  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  profileThumbnail: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Role, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn()
  role: Role;

  async isValidPassword(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  @BeforeUpdate()
  async procBeforeUpdate() {
    console.log('Before Update Triggered');
    await this.updatePasswordHash();
  }

  @BeforeInsert()
  async procBeforeInsert() {
    console.log('Before Insert Triggered');
    await this.updatePasswordHash();
  }

  async updatePasswordHash() {
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}
