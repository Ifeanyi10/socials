import request from 'supertest';
import { app, AppDataSource } from '../src/index';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    console.log('Initializing DB connection for test...');
    await AppDataSource.initialize();
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
