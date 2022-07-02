import mongoose from 'mongoose';

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    }
};

const responseSchema = new mongoose.Schema(
    {
        areaId : {
            type: mongoose.Schema.Types.ObjectId, ref: 'Area',
        },
        surveyId : {
            type: mongoose.Schema.Types.ObjectId, ref: 'Survey',
        },
        mobileNumber: {
            type: Number,
        },
        surveryAnser : {
            type: String,
        }
    },
    options
);

const Response = mongoose.model('Response', responseSchema);

export default Response;
