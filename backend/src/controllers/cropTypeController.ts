import CropType from "../models/cropTypeModel";
import Crop from "../models/cropModel";
import factory from "./handlerFactory";
import catchAsync from './../utils/catchAsync';
import { constVariable } from '../utils/const';
import { NextFunction } from 'express';
import { msg } from '../server';
import { AppError } from './../utils/appError';


const cropType = {
    //create cropType
    createCropType: factory.createOne(CropType),

    //get cropType
    getCropType: factory.getOne(CropType),

    //get all cropTypes
    getAllCropTypes: factory.getAll(CropType),

    //update cropType   
    updateCropType: catchAsync(async (req: any, res: any, next: NextFunction) => {
        const findCropType = await CropType.findById(req.params.id);
        console.log(findCropType);
        const doc = await CropType.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        
        if (!doc) {
            return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
        }
        if(doc){
            await Crop.updateMany({cropType : findCropType.cropTypeName} , {$set : {cropType : req.body.cropTypeName}});
        }
        res.status(constVariable.HTTP.OK).jsend.success({
            status: msg.controllers.handlerFactory.success,
            data: doc,
        });
    }),

    //delete cropType
    deleteCropType: catchAsync(async (req: any, res: any, next: NextFunction) => {

        let findCropType = await CropType.findById(req.params.id);
        if (findCropType) {
            let checkCropExist = await Crop.find({ cropType: findCropType.cropTypeName });
            if (checkCropExist && checkCropExist.length > 0) {
                return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
                    message: msg.controllers.cropType.cropTypeExistInCrop,
                });
            } else {
                await CropType.findByIdAndDelete(req.params.id);
                return res.status(constVariable.HTTP.OK).jsend.success({
                    data: msg.controllers.cropType.success,
                });
            }
        }

    }),

}

export default cropType;