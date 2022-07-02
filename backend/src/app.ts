import * as jsend from 'jsend'; 
import * as path from 'path';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { NextFunction } from 'connect';
import userRouter from './routes/userRoutes';
import roleRouter from './routes/roleRoutes';
import permissionRouter from './routes/permissionRoutes';
import cropRouter from './routes/cropRoutes';
import farmRouter from './routes/farmRoutes';
import surveyRouter from './routes/surveyRoutes';
import cropTypeRouter from './routes/cropTypeRoutes';
import areaRouter from './routes/areaRoutes';
import distilleryRouter from './routes/distilleryRoutes';
import purchaseRouter from './routes/purchaseRoutes';
import areaNumberRouter from './routes/areaNumberRoutes';
import whatsAppRouter from './routes/whatsappRoutes';
import paymentRouter from './routes/paymentRoutes';
const { JWT_SECRET } = require('./config/index');
import * as jwt from 'jsonwebtoken';
import { constVariable } from './utils/const';
import { en } from './utils/en-in'
import { logger, stream } from './utils/logger';
import { AppError } from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';
import utilRouter from './routes/utilsRouter';
import { endPoints } from './utils/endpoints';
/**
 * swagger
 */
// @ts-ignore
import swaggerUI from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';
let swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

// Start express app
const app: express.Application = express();

app.enable('trust proxy');
app.use(jsend.middleware);

// Implement CORS
app.use(cors());

app.use("/uploads/crops", express.static(path.join(__dirname, '../uploads/crops')))

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser, reading data from body into req.body
app.use(express.json({ limit:constVariable.JSONLIMIT }));
app.use(express.urlencoded({ extended: true, limit: constVariable.JSONLIMIT }));
app.use(cookieParser());

/**
 * Swagger API Docs
 */
app.use(
  '/api-docs',
  swaggerUI.serve,
  basicAuth({
    users: { Admin: 'test@123' },
    challenge: true,
  }),
  swaggerUI.setup(swaggerDocument),
  );
  
app.use(endPoints.whatsApp,whatsAppRouter);
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === constVariable.GLOBALERRORHANDLER.DEVELOPMENT) {
  //app.use(morgan(constVariable.MORGAN_LOG_FORMAT, { stream }));
  morgan.token('user', function(req) {
    let token:any;
    if (req.headers.authorization && req.headers.authorization.startsWith(constVariable.HTTP.BEARER)) {
      token = req.headers.authorization.split(' ')[1];
    }
    try {
      var decoded:any = jwt.verify(token, JWT_SECRET); //decodeToken(token)
      return decoded.id._id;
    } catch (e) {
        logger.error(e);
        return null;
    }
  });
  var morganLogString = '[:user|:remote-addr] ":method :url HTTP/:http-version" :status :response-time ms';
  app.use(morgan(constVariable.MORGAN_LOG_FORMAT, { "stream": stream }));
}

// Limit requests from same API
const limiter = rateLimit({
  max: constVariable.RATELIMIT.MAX,
  windowMs: constVariable.RATELIMIT.WINDOWMS,
  message: en.rateLimit.message,
});
app.use('/api', limiter);

// app.use('/',(req:any,res:any)=>{
//   res.send("Hello world!")
// })

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: constVariable.HPPWHITELIST,
  }),
);

app.use(compression());

// Test middleware
app.use((req: any, res: any, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/', (req:any , res:any) => { 
  res.send(en.helloWorld);
})

// 3) ROUTES
app.use(endPoints.user , userRouter);
app.use(endPoints.utils, utilRouter);
app.use(endPoints.roles , roleRouter);
app.use(endPoints.permissions , permissionRouter);
app.use(endPoints.crops , cropRouter);
app.use(endPoints.farm , farmRouter);
app.use(endPoints.survey , surveyRouter);
app.use(endPoints.cropType , cropTypeRouter);
app.use(endPoints.area , areaRouter);
app.use(endPoints.distillery , distilleryRouter);
app.use(endPoints.purchase , purchaseRouter);
app.use(endPoints.areaNumber , areaNumberRouter);
app.use(endPoints.payment , paymentRouter);

app.all('*', (req: any, res: any, next: any) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, constVariable.HTTP.NOTFOUND));
});

app.use(globalErrorHandler);

export default app;
