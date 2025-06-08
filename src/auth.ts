import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { File } from './models/file-model';
import { Post } from './models/post-model';
import { User } from './models/user-model';
import { Hashtag } from './models/hashtag-model';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Post, File, User, Hashtag],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
