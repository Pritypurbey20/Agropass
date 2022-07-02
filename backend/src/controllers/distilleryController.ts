import Distillery from "../models/distilleryModel";
import Purchase from "../models/purchaseModel";
import factory from "./handlerFactory";
import catchAsync from "../utils/catchAsync";
import { NextFunction } from "express";
import { constVariable } from '../utils/const';
import { msg } from '../server';
import { AppError } from './../utils/appError';


const distillery = {
    //create distillery batch
    createDistillery: factory.createOne(Distillery),

    //get distillery batch
    getDistillery: factory.getOne(Distillery),

    //get all distilleries
    getAllDistilleries: factory.getAll(Distillery, 'distilleryOwnerId'),

    //update distillery batch
    updateDistillery: factory.updateOne(Distillery),

    //delete distillery batch
    deleteDistillery: catchAsync(async (req: any, res: any, next: NextFunction) => {
        let checkPurchaseExist = await Purchase.find({ distilleryBatch: req.params.id });
        if (checkPurchaseExist && checkPurchaseExist.length > 0) {
            return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
                message: msg.controllers.distillery.distilleryExistInPurchase,
            });
        } else {
            await Distillery.findByIdAndDelete(req.params.id);
            return res.status(constVariable.HTTP.OK).jsend.success({
                data: msg.controllers.distillery.success,
            });
        }
    }),

    //get distillery batch info
    getDistilleries: catchAsync(async (req: any, res: any, next: NextFunction) => {
        const allDistillery = await Distillery.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'distilleryOwnerId',
                    foreignField: '_id',
                    as: 'distilleryOwner',
                }
            },
            {
                $lookup: {
                    from: 'farms',
                    localField: 'distilleryOwnerId',
                    foreignField: 'farmOwnerId',
                    as: 'farms'
                }
            },
            {
                $lookup: {
                    from: 'purchases',
                    localField: '_id',
                    foreignField: 'distilleryBatch',
                    as: 'purchases',
                },
            },
            {
                $lookup: {
                    from: 'purchases',
                    localField: '_id',
                    foreignField: 'distilleryBatch',
                    as: 'quantity',
                    pipeline: [
                        {
                            $group: {
                                _id: '$distilleryBatch',
                                total: { $sum: "$quantity" },
                            }
                        }
                    ],
                }
            }
        ])
        res.status(constVariable.HTTP.OK).jsend.success({
            data: allDistillery,
        })
    })

}

export default distillery;  