export interface Strategy {
    get(key: string): Promise<string | null>;
    has(key: string): Promise<boolean>;
    set(key: string, value: string): void;
  }
  
  export type strategiesList = {
    [key: string]: Strategy;
  };