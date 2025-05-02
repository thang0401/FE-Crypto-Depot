// /lib/redis.js
import { createClient } from '@redis/client';

let client;

async function connectWithRetry(client, retries = 5, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await client.connect();
      console.log(`Redis connection established (Process ID: ${process.pid})`);
      return;
    } catch (err) {
      if (err.message.includes('max number of clients reached')) {
        console.warn(`Retry ${i + 1}/${retries} after ${delay}ms due to max clients reached (Process ID: ${process.pid})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        console.error(`Redis connection error: ${err.message} (Process ID: ${process.pid})`);
        throw err;
      }
    }
  }
  const errorMsg = `Failed to connect to Redis after ${retries} retries (Process ID: ${process.pid})`;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

export async function getRedisClient() {
  if (!client) {
    client = createClient({
      username: process.env.REDIS_USERNAME || 'default',
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10)
      }
    });

    client.on('error', (err) => console.error(`Redis Client Error: ${err.message} (Process ID: ${process.pid})`));
    client.on('connect', () => console.log(`Redis Connected (Process ID: ${process.pid})`));

    console.log(`New Redis client created (Process ID: ${process.pid})`);
    await connectWithRetry(client);
  }

  if (!client.isOpen) {
    console.log(`Reconnecting Redis client (Process ID: ${process.pid})`);
    await connectWithRetry(client);
  }

  return client;
}

// Đóng kết nối khi ứng dụng tắt
process.on('SIGTERM', async () => {
  if (client && client.isOpen) {
    await client.quit();
    console.log(`Redis connection closed (Process ID: ${process.pid})`);
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  if (client && client.isOpen) {
    await client.quit();
    console.log(`Redis connection closed (Process ID: ${process.pid})`);
  }
  process.exit(0);
});