import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract class AbstractModule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ unique: true, length: 3 })
  key: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setUpdateKey() {
    const k = this.name.substr(0, 3).toUpperCase();
    this.key = k;
  }
}

@Entity()
export class Module extends AbstractModule {
  @OneToMany(() => SubModule, (subModule) => subModule.parent)
  subModules: SubModule[];
}

@Entity()
export class SubModule extends AbstractModule {
  @ManyToOne(() => Module, (module) => module.subModules, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  parent: Module;
}
