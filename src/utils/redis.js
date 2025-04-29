// /lib/redis.js
import { createClient } from '@redis/client';

const client = createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10)
  }
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Connected'));

// Kết nối Redis khi server khởi động
client.connect().catch((err) => console.error('Redis Connect Error', err));

export default client;