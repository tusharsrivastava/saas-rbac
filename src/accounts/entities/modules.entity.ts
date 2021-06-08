import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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

@ChildEntity()
export class Module extends AbstractModule {
  @OneToMany(() => SubModule, (subModule) => subModule.parent)
  subModules: SubModule[];
}

@ChildEntity()
export class SubModule extends AbstractModule {
  @ManyToOne(() => Module, (module) => module.subModules, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  parent: Module;
}
