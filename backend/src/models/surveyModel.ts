import mongoose from 'mongoose';
import { msg } from '../server'
import { constVariable } from '../utils/const';

const options = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: 'modifiedAt',
    },
};

const surveySchema = new mongoose.Schema(
    {
        surveyName: {
            type: String,
            required: [true, msg.module.insertSurveyName],
        },
        surveyQuestion: {
            type: String,
            required: [true, msg.module.insertSurveyQuestion],
        },
        surveyAnswerOptions: {
            type: [String],
            required: [true, msg.module.insertSurveyAnswerOptions],
        }
    },
    options,
)

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;