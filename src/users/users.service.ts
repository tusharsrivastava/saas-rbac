import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from './users.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repo: Repository<User>,
  ) {}

  async createOne(user: CreateUserDto): Promise<User | undefined> {
    const userEntity: User = this.repo.create(user);
    return this.repo.save(userEntity);
  }

  async findOneByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.findOneByUsername(username);
    if (user) {
      const isMatch = await user.isValidPassword(password);

      if (isMatch) {
        return user;
      }
    }
    return undefined;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.repo.findOneOrFail({
      username: username,
    });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.repo.findOneOrFail(id);
  }

  async listAll(): Promise<User[]> {
    return this.repo.find();
  }
}
