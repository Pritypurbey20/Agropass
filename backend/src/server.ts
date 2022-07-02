// import * as mongoose from 'mongoose';
import {en} from './utils/en-in';
export let msg = en;
import dotenv from 'dotenv';
import { dbConnection } from './databases';
import { connect } from 'mongoose';
import app from './app';
import http from 'http';
import mongoose from 'mongoose';
import { constVariable } from './utils/const';
import DefaultData from './migration/defaultData';
import { logger } from './utils/logger';
import {NODE_ENV} from './config/index';

process.on(en.uncaughtException.processName, err => {
  logger.error(en.uncaughtException.message);
  logger.error(err.name, err);
  process.exit(1);
});

// dotenv.config({ path: '.env.development.local' });

export const db = connect(dbConnection.url, dbConnection.options).then(() => logger.info(en.dbConnSuccessMsg));
(async() => {
  await new DefaultData().createDefaultRoles();
})()


const port = process.env.PORT || constVariable.PORT;
const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`${en.serverListenMsg} ${port}...`);
});

const connection = mongoose.connection;

process.on(en.unhandledRejection.processName, (err: Error) => {
  console.log(err)
  logger.error(en.unhandledRejection.message);
  logger.error(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on(en.SIGTERM.processName, () => {
  logger.info(en.SIGTERM.receivedErrMsg);
  server.close(() => {
    logger.info(en.SIGTERM.terminatedErrMsg);
  });
});
