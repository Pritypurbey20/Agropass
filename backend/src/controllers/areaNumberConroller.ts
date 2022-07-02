import AreaNumber from "../models/areaNumber";
import factory from "./handlerFactory";

const areaNumber = {
    //create areaNumber
    createAreaNumber: factory.createOne(AreaNumber),

    //get areaNumber
    getAreaNumber: factory.getOne(AreaNumber),

    //get all areaNumbers
    getAllAreaNumbers: factory.getAll(AreaNumber , 'areaId'),

    //update areaNumber
    updateAreaNumber: factory.updateOne(AreaNumber),

    //delete areaNumber
    deleteAreaNumber: factory.deleteOne(AreaNumber),
}

export default areaNumber;