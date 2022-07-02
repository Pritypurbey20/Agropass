import mongoose from 'mongoose';
import { msg } from '../server'

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    }
};

const cropSchema = new mongoose.Schema(
    {
        cropName: {
            type: String,
            required: [true, msg.module.insertCropName],
            unique: [true, msg.module.cropNameExist],
            index: true,
        },
        cropType :{
            type: String,
            required: [true, msg.module.insertCropType],
            index: true,
        },
        cropImage: {
            type: String,
            required: [true, msg.module.insertCropImage],
            index: true,
        }
    },
    options
);

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;


