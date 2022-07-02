import catchAsync from './../utils/catchAsync';
import { AppError } from './../utils/appError';
import APIFeatures from './../utils/apiFeatures';
import { NextFunction } from 'express';
import { msg } from '../server';
import { constVariable } from '../utils/const';


const factory = {
  deleteOne: (Model: any) =>
    catchAsync(async (req: any, res: any, next: any) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
      }

      return res.status(constVariable.HTTP.OK).jsend.success({
        message: msg.controllers.handlerFactory.documentDeleted,
      });
    }),

  updateOne: (Model: any) =>
    catchAsync(async (req: any, res: any, next: NextFunction) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
      }

      res.status(constVariable.HTTP.OK).jsend.success({
        status: msg.controllers.handlerFactory.success,
        data: doc,
      });
    }),

  createOne: (Model: any) =>
    catchAsync(async (req: any, res: any, next: NextFunction) => {
      const doc = await Model.create(req.body);
      res.status(constVariable.HTTP.CREATED).jsend.success({
        data: doc,
      });
    }),

  getOne: (Model: any, popOptions?: any) =>
    catchAsync(async (req: any, res: any, next: NextFunction) => {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
        return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
      }

      res.status(constVariable.HTTP.OK).jsend.success({
        data: doc,
      });
    }),

  getAll: (Model: any, popOptions?: any) =>
    catchAsync(async (req: any, res: any, next: NextFunction) => {
      let query = Model.findById(req.params.id);
      let filter = {};
      const features = new APIFeatures(Model.find(filter), req.query).filter().search().sort().limitFields().paginate();
      const count = new APIFeatures(Model.find(filter), req.query).filter().search().sort().limitFields().count();
      features.query = features.query.populate(popOptions);
      const doc = await features.query;
      const records = await count.query;
      // console.log(records)
      // SEND RESPONSE
      res.status(constVariable.HTTP.OK).jsend.success({
        results: doc.length,
        records: records,
        data: doc,
      });
    }),
};

export default factory;
