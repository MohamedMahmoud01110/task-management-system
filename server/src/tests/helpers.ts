import request from 'supertest';
import app from '../app';

export async function registerUser(overrides: Partial<{
  name: string;
  email: string;
  password: string;
}> = {}) {
  const defaultUser = {
    name: 'Test User',
    email: `user${Date.now()}${Math.random()}@example.com`,
    password: '123456',
  };

  const res = await request(app)
    .post('/api/auth/register')
    .send({ ...defaultUser, ...overrides });

  return res.body.data; // { token, user }
}