import Farm from "../models/farmModel";
import factory from "./handlerFactory";
import catchAsync from "../utils/catchAsync";
import { NextFunction } from 'express';
import { constVariable } from '../utils/const';
import { AppError } from './../utils/appError';
import { msg } from '../server';

const farm = {

    // create farm
    createFarm: catchAsync(async (req: any, res: any, next: NextFunction) => {
        const farmData = req.body;
        const playload = {
            ...req.body,
            'location.type': 'Point',
            'location.coordinates': [farmData.latitude, farmData.longitude],
        }
        const doc = await Farm.create(playload);
        res.status(constVariable.HTTP.CREATED).jsend.success({
            data: doc,
        });
    }),

    //update farm
    updateFarm: catchAsync(async (req: any, res: any, next: NextFunction) => {
        const farmData = req.body;
        const playload = {
            ...req.body,
            'location.type': 'Point',
            'location.coordinates': [farmData.latitude, farmData.longitude],
        }
        const doc = await Farm.findByIdAndUpdate({_id:req.params.id},playload , {new: true});
        if (!doc) {
            return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
        }
        res.status(constVariable.HTTP.OK).jsend.success({
            data: doc,
        });
    }),

    //get farm
    getFarm: factory.getOne(Farm),

    //get all farm
    getAllFarms: factory.getAll(Farm , 'farmOwnerId'),

    //delete farm
    deleteFarm: factory.deleteOne(Farm),
}

export default farm;