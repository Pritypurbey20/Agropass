import mongoose from 'mongoose';
import { msg } from "../server";

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: "modifiedAt",
    }
}

const distillationBatchSchema = new mongoose.Schema(
    {
        distilleryOwnerId :{
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: [true, msg.module.insertdistilleryOwnerId],
        },
        distilleryBatchFor : {
            type : String,
            required : [true, msg.module.insertdistilleryBatchFor],
        },
        dispatchDate : {
            type : Date,
            required : [true, msg.module.insertDispatchDate],
        },
        distilleryBatchId : {
            type : String,
            required : [true, msg.module.insertdistilleryBatchId],
        }

    },
    options
)

const Distillery = mongoose.model('Distillery', distillationBatchSchema);

export default Distillery;