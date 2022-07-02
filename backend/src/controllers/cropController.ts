import { NextFunction } from "express";
import Crop from "../models/cropModel";
import { AppError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import factory from "./handlerFactory";
import { deleteFile } from "../helper/deleteFile";
import { msg } from '../server';
import { constVariable } from '../utils/const';

const crops = {

  // crop image upload

  cropImageUpload: catchAsync(async (req: any, res: any, next: NextFunction) => {
    console.log(req.files);
    if (!req.files || req.files === []) {
      return next(new AppError(msg.controllers.crop.plzSendImage, 403));
    }
    const cropId = req.params.id;
    const cropData = Crop.findById(cropId);
    deleteFile(cropData.cropImage);

    await Crop.updateOne({ _id: cropId }, { cropImage: req.files[0].path });

    return res.status(200).jsend.success({ message: msg.controllers.crop.imageUploaded });

  }),

  // create crop

  createCrop: catchAsync(async (req: any, res: any, next: NextFunction) => {
    if (req.files.length == 0) {
      return next(new AppError(msg.controllers.crop.plzSendImage, 403));
    }
    let filePath
    if (req.files.length > 0) {
      filePath = req.files[0].filename
    }
    const payload = {
      ...req.body,
      cropImage: filePath
    }
    const doc = await Crop.create(payload);
    res.status(constVariable.HTTP.CREATED).jsend.success({
      data: doc,
    });
  }),

  //update crop

  updateCrop: catchAsync(async (req: any, res: any, next: NextFunction) => {
    let payload;
    if (req.files.length == 0) {
      payload = { ...req.body }
    }

    if (req.files.length > 0) {
      let cropData = await Crop.findById(req.params.id);
      deleteFile(cropData.cropImage);

      if (!cropData) {
        return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
      }

      payload = {
        ...req.body,
        cropImage: req.files[0].filename
      }
    }

    const doc = await Crop.updateOne({ _id: req.params.id }, payload);
    res.status(constVariable.HTTP.OK).jsend.success({
      status: msg.controllers.handlerFactory.success,
      data: doc,
    });

  }),

  //get crop
  getCrop: factory.getOne(Crop),

  //get all crop
  getAllCrops: factory.getAll(Crop),

  //delete crop
  deleteCrop: factory.deleteOne(Crop),
}

export default crops;