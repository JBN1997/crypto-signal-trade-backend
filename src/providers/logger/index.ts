import { createLogger, transports, format } from 'winston';

const logger = createLogger({
   format: format.combine(
      format.errors({ stack: true }),
      format.json(),
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message, service }) => {
         return `[${timestamp}] ${service} ${level}: ${message}`;
      }),
   ),
   transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'info.log', level: 'info' }),
   ],
});

if (process.env.NODE_ENV !== 'production') {
   logger.add(
      new transports.Console({
         format: format.simple(),
      }),
   );
}

export default logger;
