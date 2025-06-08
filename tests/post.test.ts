import request from 'supertest';
import { app, AppDataSource } from '../src/index';
import { User } from '../src/models/user-model';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    console.log('Initializing DB connection for test...');
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    console.log('Completed  DB connection test');
    
    // Seed a sudo user if needed
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ userId: 1 });
    if (!user) {
      await userRepo.save({
        userId: 1, // this is because the controller expects user id of 1
        username: 'sudo',
        email: 'sudo@example.com',
      });
    }
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe('POST /api/posts', () => {
  it('should create a new post without file', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Integration Test Post',
        body: 'This post is created as part of an automated test.',
        hashtags: '#test #integration'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Post created');
    expect(response.body.post).toHaveProperty('title', 'Integration Test Post');
  });

  it('should fail to create a post with missing title', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        body: 'Missing title',
        hashtags: '#error #case'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Post title is required.');
  });
});
