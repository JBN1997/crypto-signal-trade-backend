import { Service } from "typedi";
import Redis from 'infra/redis';
import CONFIG from "@config/env";

import { Strategy, strategiesList } from "./cache.declaration";

import RedisStrategy from "./strategies/redis.strategy";

const strategies: strategiesList = {
  redis: new RedisStrategy(Redis.getClient()),
};

@Service()
class CacheContext {
  private selectedStrategy: Strategy;
  private strategyKey: keyof strategiesList;

  constructor(strategyKey: keyof strategiesList = CONFIG.CACHE.PROVIDER) {
    this.strategyKey = strategyKey;
    this.selectedStrategy = strategies[strategyKey];
  }

  public setSelectedStrategy(strategy: keyof strategiesList) {
    this.selectedStrategy = strategies[strategy];
  }

  public has(key: string) {
    return this.selectedStrategy.has(key);
  }

  public async get(key: string) {
    console.log(
      `Request for cache key: ${key} was served by ${this.strategyKey.toString()}`
    );
    const value = await this.selectedStrategy.get(key);
    return value;
  }

  public async set(key: string, value: string) {
    await this.selectedStrategy.set(key, value);
  }
}

export default CacheContext;