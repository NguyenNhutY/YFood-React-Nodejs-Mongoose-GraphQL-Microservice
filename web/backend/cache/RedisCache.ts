import { createClient, RedisClientType } from "redis";

class RedisCache {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:5713",
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    this.client.connect().then(() => {
      console.log("Connected to Redis");
    });
  }

  async set(key: string, value: string, expireTime?: number): Promise<void> {
    try {
      await this.client.set(key, value);
      if (expireTime) {
        await this.client.expire(key, expireTime);
      }
    } catch (err) {
      console.error("Error setting value in Redis", err);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error("Error getting value from Redis", err);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error("Error deleting value from Redis", err);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.client.flushAll();
    } catch (err) {
      console.error("Error clearing Redis cache", err);
    }
  }

  // You can add more methods as needed, like checking if a key exists, incrementing a value, etc.
}

export default new RedisCache();
