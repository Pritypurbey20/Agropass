import Payment from "../models/paymentModel";
import factory from "./handlerFactory";
import catchAsync from "../utils/catchAsync";
import { NextFunction } from "express";
import User from "../models/userModel";
import { constVariable } from "../utils/const";

const payment = {
    //create payment
    createPayment: catchAsync(async (req: any, res: any, next: NextFunction) => {
        await User.findOneAndUpdate({ _id: req.body.farmer }, { $inc: { amount: (req.body.amount * -1) } });
        const playload = {
            ...req.body,
            'paymentStatus' : 'paid',
        }
        const doc = await Payment.create(playload);
        res.status(constVariable.HTTP.CREATED).jsend.success({
            data: doc,
        })
    }),

    //get payment
    getPayment: factory.getOne(Payment),

    //get all payments
    getAllPayments: factory.getAll(Payment, 'purchaseId'),

    //delete payment
    deletePayment: factory.deleteOne(Payment),

}

export default payment;