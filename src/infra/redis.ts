import { RedisClientType, createClient } from "@redis/client";

interface IRedisClient {
   initialize: () => void;
}

class Redis implements IRedisClient {
   private redisClient: RedisClientType = createClient();

   initialize = async () => {
      this.redisClient.on('error', this.onError);
      await this.redisClient.connect();

      console.log("🐕‍🦺 [Redis]: Successfully connected to the Redis server");
   }

   onError = (err: any) => {
      console.log("🐕‍🦺 [Redis] Redis Client Error: ", err)
   }

   getClient() {
      return this.redisClient;
   }

}

export default new Redis();
