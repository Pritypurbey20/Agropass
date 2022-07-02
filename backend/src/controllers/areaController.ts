import Area from "../models/areaModel";
import factory from "./handlerFactory";
import AreaNumber from "../models/areaNumber";
import catchAsync from "../utils/catchAsync";
import { constVariable } from "../utils/const";
import { msg } from "../server";
import { NextFunction } from 'express';

const area = {
    //create area
    createArea: factory.createOne(Area),

    //get area
    getArea: factory.getOne(Area),

    //get all areas
    getAllAreas: factory.getAll(Area),

    //update area
    updateArea: factory.updateOne(Area),

    //delete area
    deleteArea: catchAsync(async (req: any, res: any, next: NextFunction) => {
        let checkAreaNumberExist = await AreaNumber.find({ areaId: req.params.id });
        if (checkAreaNumberExist && checkAreaNumberExist.length > 0) {
            return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
                message: msg.controllers.area.areaNumberExistInArea,
            });
        } else {
            await Area.findByIdAndDelete(req.params.id);
            return res.status(constVariable.HTTP.OK).jsend.success({
                data: msg.controllers.area.success,
            });
        }
    })
}

export default area;