import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DEFAULT,
  logging: false,
  entities: [
    'src/models/**/*.ts',
  ],
  migrations: [
    'src/database/migrations/*.ts',
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
  },
};

export default ormConfig;
