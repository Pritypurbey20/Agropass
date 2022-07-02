import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '../config/index';
import { constVariable } from '../utils/const';

// logs dir
const logDir: string = join(__dirname, LOG_DIR || '');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: constVariable.FORMAT.DATE
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: constVariable.FORMAT.LEVEL_DEBUG,
      datePattern: constVariable.FORMAT.DATEPATTERN,
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: constVariable.FORMAT.FILENAME,
      maxFiles: constVariable.FORMAT.MAXFILESLENGTH, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: constVariable.FORMAT.LEVEL_ERROR,
      datePattern: constVariable.FORMAT.DATEPATTERN,
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: constVariable.FORMAT.FILENAME,
      maxFiles: constVariable.FORMAT.MAXFILESLENGTH, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
