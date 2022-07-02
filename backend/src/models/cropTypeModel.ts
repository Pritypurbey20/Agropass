import mongoose from 'mongoose';
import { msg } from '../server'

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    }
};

const cropTypeSchema = new mongoose.Schema(
    {
        cropTypeName: {
            type: String,
            required: [true, msg.module.insertCropTypeName],
            index: true,
        }
    },
    options
)

// cropTypeSchema .index({'$**': 'text'})

const CropType = mongoose.model('CropType', cropTypeSchema);

export default CropType;