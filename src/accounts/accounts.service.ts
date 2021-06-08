import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MODULES_REPOSITORY } from './accounts.providers';
import { Module } from './entities/modules.entity';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(MODULES_REPOSITORY)
    private readonly moduleRepo: Repository<Module>,
  ) {}

  async getModuleByKey(key: string) {
    return this.moduleRepo.findOne({ key: key });
  }
}
