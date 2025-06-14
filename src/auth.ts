import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { File } from './models/file-model';
import { Post } from './models/post-model';
import { User } from './models/user-model';
import { Hashtag } from './models/hashtag-model';
import { Comment } from './models/comment-model';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Post, File, User, Hashtag, Comment],
  migrations: isTest ? [] : ['src/migrations/*.ts'],
  synchronize: isTest,   // for testing auto‐create tables
  dropSchema: isTest,    // for testing drop old schema
  logging: false,
});
