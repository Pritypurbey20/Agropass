import mongoose from 'mongoose';
import { msg } from '../server';

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true, 
        updatedAt: 'modifiedAt',
    }
};

const purchaseSchema = new mongoose.Schema(
    {
        userName: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: [true, msg.module.insertUserName],
            index: true,
        },
        farmer: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: [true, msg.module.insertFarmer],
            index: true,
        },
        quantity: {
            type: Number,
            required: [true, msg.module.insertQuantity],
        },
        quality: {
            type: Number,
            min: 0,
            max: 10,
            required: [true, msg.module.insertQuality],
        },
        pricePerUnit : {
            type: Number,
            required: [true, msg.module.insertPricePerUnit],
        },
        inceptionDate : {
            type: Date,
            required: [true, msg.module.insertInceptionDate],
        },
        inceptionResult : {
            type : Boolean,
            required: [true, msg.module.insertInceptionResult],
        },
        revisedPricePerUnit : {
            type: Number,
        },
        notes : {
            type : String,
        },
        distilleryBatch : {
            type : mongoose.Schema.Types.ObjectId, ref : 'Distillery',
            required: [true, msg.module.insertDistilleryBatch],
        },
        deliveryDateToDistillery : {
            type : Date,
            required: [true, msg.module.insertDeliveryDateToDistillery],
        },
        purchaseId : {
            type : String,
        },
        amount : {
            type : Number,
        }
    },
    options,
)

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;