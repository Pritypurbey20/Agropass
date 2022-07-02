import mongoose from 'mongoose';
import { msg } from '../server'

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    }
}

const areaNumberSchema = new mongoose.Schema(
    {
        mobileNumber: {
            type: Number,
            required: [true, msg.module.insertMobileNumber],
        },
        countyCode: {
            type: String,
            required: [true, msg.module.insertCountyCode],
        },
        areaId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Area',
            required: [true, msg.module.insertAreaId],
        },
        surveyId : {
            type: mongoose.Schema.Types.ObjectId, ref: 'Survey',
        }
    },
    options
)

const AreaNumber = mongoose.model('AreaNumber', areaNumberSchema);

export default AreaNumber;