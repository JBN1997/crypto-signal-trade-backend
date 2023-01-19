import dotenv from 'dotenv';

dotenv.config();

const getEnvVariable = (name: string, fallback: string = ''): string => {
   const envVariable = process.env[name];
   const fallbackProvided = fallback.length;

   if (!envVariable && !fallbackProvided) {
      throw new Error(`Environment variable ${name} has not been set.`);
   }

   return envVariable || fallback;
};

const CONFIG = {
   SERVER: {
      PORT: getEnvVariable('PORT', '3001'),
      ENV: getEnvVariable('NODE_ENV', 'development'),
   },
   CACHE: {
      PROVIDER: getEnvVariable('CACHE_PROVIDER', 'redis'),
   },
};

export default CONFIG;
