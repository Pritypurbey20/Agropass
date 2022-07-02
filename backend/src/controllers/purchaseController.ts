import Purchase from "../models/purchaseModel";
import Payment from "../models/paymentModel";
import { AppError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { NextFunction } from "express";
import { msg } from "../server";
import factory from "./handlerFactory";
import { constVariable } from "../utils/const";

const purchase = {
    //create purchase
    createPurchase: catchAsync(async (req: any, res: any, next: NextFunction) => {        
        let body = {
            ...req.body,
            amount : req.body.quantity * req.body.pricePerUnit,
        }        
        const doc = await Purchase.create(body);
        res.status(constVariable.HTTP.CREATED).jsend.success({
            data: doc,
        })
    }),

    //get purchase
    getPurchase: factory.getOne(Purchase),

    //get all purchases
    getAllPurchases: factory.getAll(Purchase , ['userName','farmer','distilleryBatch']),

    //update purchase
    updatePurchase: factory.updateOne(Purchase),

    //delete purchase
    deletePurchase: catchAsync(async (req: any, res: any, next: NextFunction) => {
        let checkPaymentExist = await Payment.find({ purchaseId: req.params.id });
        if (checkPaymentExist && checkPaymentExist.length > 0) {
            return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
                message: msg.controllers.purchase.purchaseExistInPayment,
            });
        } else {
            await Purchase.findByIdAndDelete(req.params.id);
            return res.status(constVariable.HTTP.OK).jsend.success({
                data: msg.controllers.purchase.success,
            });
        }
    })
}

export default purchase;