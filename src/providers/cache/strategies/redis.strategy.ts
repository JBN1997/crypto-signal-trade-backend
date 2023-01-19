import { RedisClientType } from '@redis/client';
import { Strategy } from '../cache.declaration';

class RedisStrategy implements Strategy {
   private connection;

   constructor(connection: RedisClientType) {
      this.connection = connection;
   }

   public async get(key: string): Promise<string | null> {
      const result = await this.connection.get(key);

      return result;
   }

   public async has(key: string): Promise<boolean> {
      const result = await this.connection.get(key);

      return result !== undefined && result !== null;
   }

   public async set(key: string, value: string) {
      await this.connection.set(key, value);
   }
}

export default RedisStrategy;
