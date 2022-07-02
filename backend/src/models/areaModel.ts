import mongoose from 'mongoose';
import { msg } from '../server'

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    }
};

const areaSchema = new mongoose.Schema(
    {
        areaName:{
            type: String,
            required: [true, msg.module.insertAreaName],
            index: true,
        },
        state: {
            type: String,
            required: [true, msg.module.insertStateName],
            index: true,
        },
        district: {
            type: String,
            required: [true, msg.module.insertDistrictName],
            index: true,
        }
        
    }, 
    options
);

const Area = mongoose.model('Area', areaSchema);

export default Area;
