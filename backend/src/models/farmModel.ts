import mongoose from 'mongoose';
import { msg } from '../server';


const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    },
};

const farmSchema = new mongoose.Schema(
    {
        farmOwnerId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: [true, msg.module.insertFarmOwner],
            index: true,
        },
        location: {
            type: {
              type: String,
              enum: ['Point'], // 'location.type' must be 'Point'
            },
            coordinates: {
              type: [Number],
            },
          },
    },
    options
)

const Farm = mongoose.model('Farm', farmSchema);

export default Farm;