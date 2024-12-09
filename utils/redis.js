import { promisify } from 'util';
import { createClient } from 'redis';

// Create Redis client
class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  // confirm redis connection
  isAlive() {
    return this.isClientConnected;
  }

  // get key value
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  // set a key value with an expiractine duration
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  // delete value of a given key
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
