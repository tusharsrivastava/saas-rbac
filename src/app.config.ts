import { plainToClass } from 'class-transformer';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  IsNumber,
  IsIn,
  validateSync,
  IsString,
  IsBoolean,
} from 'class-validator';

const enviroments = ['development', 'test', 'production'] as const;
type Environment = typeof enviroments[number];

class EnvironmentVariables {
  @IsIn(enviroments)
  NODE_ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_SCHEMA: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsBoolean()
  DB_LOGGING: boolean;
}

export class AppConfig {
  private static get env(): EnvironmentVariables {
    return plainToClass(EnvironmentVariables, process.env, {
      enableImplicitConversion: true,
    });
  }

  public static getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,

      username: this.env.DB_USER,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_SCHEMA,

      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      synchronize: false,
      logging: this.env.DB_LOGGING,
    };
  }

  public static validateConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}
