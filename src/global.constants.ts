export const jwtConstants = {
  secret: process.env.SECRET_KEY || 'mysupersecretkey',
  expiresIn: '1d',
  issuer: 'saas-rbac',
};

export const injectedConsts = {
  DATABASE_CONNECTION: 'DATABASE_CONNECTION',
};

export const SALT_OR_ROUNDS = 10;
