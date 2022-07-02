import mongoose, { Types } from 'mongoose';
import catchAsync from '../utils/catchAsync';
import { constVariable } from '../utils/const';
import {msg} from '../server'
const utils = {
  findDuplicate: catchAsync(async (req: any, res: any) => {
    try {
      const model = req.params.model;
      const query = req.query;
      mongoose.connection.db.collection(model, function (err, collection) {
        collection.find(query).toArray(function (err, data) {
          if (data.length !== 0) {
            res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.utils.duplicateValueFound, found: true });
          } else {
            res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.utils.duplicateValueNotFound, found: false });
          }
        });
      });
    } catch (err: any) {
      res.status(constVariable.HTTP.FORBIDDEN).jsend.error({ message: err.message });
    }
  }),
};

export default utils;

mongoose.connection;
