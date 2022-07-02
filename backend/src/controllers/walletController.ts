import User from "../models/userModel";
import { msg } from "../server";
import { constVariable } from "../utils/const";
import { NextFunction } from "express";
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError";

const wallet = {

    // Add amount to wallet
    addAmountToWallet: catchAsync(async (req: any, res: any, next: NextFunction) => {
        const user = await User.findOneAndUpdate({ _id: req.body.user }, { $inc: { amount: req.body.amount } });
        if (!user) {
            return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
        }
        res.status(constVariable.HTTP.CREATED).jsend.success({
            data: user,
        })
    }),

    // debit amount from wallet
    debitAmountFromWallet: catchAsync(async (req: any, res: any, next: NextFunction) => {
        const user = await User.findOneAndUpdate({ _id: req.body.user }, { $inc: { amount: (req.body.amount * -1) } });
        if (!user) {
            return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
        }
        res.status(constVariable.HTTP.CREATED).jsend.success({
            data: user,
        })
    })
};

export default wallet;