import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from './entities/modules.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepo: Repository<Module>,
  ) {}

  async getModuleByKey(key: string) {
    return this.moduleRepo.findOne({ key: key });
  }
}
