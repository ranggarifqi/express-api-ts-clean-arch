import * as winston from 'winston';

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: `info.log`,
      level: 'info',
      format: fileFormat,
    }),
  ],
});

/** Custom Module for Logger */
const moduleLogger = (moduleName?: string): ModuleLogger => {
  return {
    info: (message: string, ...meta: unknown[]) => {
      if (moduleName) {
        logger.info(`[${moduleName}] ${message}`, meta);
      } else {
        logger.info(message, meta);
      }
    },
    error: (error: Error, ...meta: unknown[]) => {
      if (moduleName) {
        logger.error(`[${moduleName}] ${error.message}`, meta);
      } else {
        logger.error(error.message, meta);
      }
    },
  };
};

interface ModuleLogger {
  info: (message: string, ...meta: unknown[]) => void;
  error: (error: Error, ...meta: unknown[]) => void;
}

export default moduleLogger;
