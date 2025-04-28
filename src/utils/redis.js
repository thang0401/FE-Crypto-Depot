// /lib/redis.js
import { createClient } from '@redis/client';

const client = createClient({
  username: 'default',
  password: 'KhTZArJzVWizJUAH7mqFJ6IeiuLeFbd0',
  socket: {
    host: 'redis-17311.c334.asia-southeast2-1.gce.redns.redis-cloud.com',
    port: 17311
  }
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Connected'));

// Kết nối Redis khi server khởi động
client.connect().catch((err) => console.error('Redis Connect Error', err));

export default client;