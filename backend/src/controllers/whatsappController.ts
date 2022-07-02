import { NextFunction } from "express";
import { AppError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { msg } from '../server';
import axios from 'axios';
import { constVariable } from '../utils/const';
import AreaNumber from "../models/areaNumber";
import Survey from "../models/surveyModel";
import Response from "../models/responseModel";

const whatsapp = {

    verifyWebHook: catchAsync(async (req: any, res: any, next: NextFunction) => {
        // console.log("asdhgajdgbadjaj");
        console.log(req.query);
        const verify_token = '12345';
        let mode = req.query["hub.mode"];
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];

        console.log("token ", token, "mode ", mode)
        if (mode && token) {
            if (mode === "subscribe" && token === verify_token) {
                console.log("WEBHOOK_VERIFIED");
                return res.status(200).send(challenge);

            } else {
                return next(new AppError(msg.controllers.whatsapp.notFound, 403));
            }
        }
    }),

    webHook: catchAsync(async (req: any, res: any, next: NextFunction) => {

        // console.log(JSON.stringify(req.body, null, 2));

        if (!req.body.entry) {
            return next(new AppError(msg.controllers.whatsapp.notFound, 403));
        }

        if (req.body.object) {
            if (
                req.body.entry &&
                req.body.entry[0].changes &&
                req.body.entry[0].changes[0] &&
                req.body.entry[0].changes[0].value.messages &&
                req.body.entry[0].changes[0].value.messages[0]
            ) {
                let phone_number_id =
                    req.body.entry[0].changes[0].value.metadata.phone_number_id;
                let from = req.body.entry[0].changes[0].value.messages[0].from.slice(-10); // extract the phone number from the webhook payload
                let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

                console.log("phone_number_id--> ", phone_number_id, "from--> ", from, "msg_body--> ", msg_body);

                let findMobileNumber = await AreaNumber.findOne({ mobileNumber: from })
                let findSurvey = await Survey.findOne({ _id: findMobileNumber.surveyId })

                if (isNaN(msg_body)) {
                    console.log('Select a valid option')
                }
                let findResponse = await Response.find({ surveyId: findSurvey._id, mobileNumber: from })
                if (!findResponse) {
                    let saveResponse = await Response.create({
                        areaId: findMobileNumber.areaId,
                        surveyId: findMobileNumber.surveyId,
                        mobileNumber: from,
                        surveryAnser: findSurvey.surveyAnswerOptions[msg_body - 1]
                    })
                    res.status(constVariable.HTTP.CREATED).jsend.success({
                        data: saveResponse,
                    });
                } else {
                    console.log('You have already answered this survey')
                }
            }
        }
    }),

    sendMsgSurvey: catchAsync(async (req: any, res: any, next: NextFunction) => {
        console.log(req.body);
        if (req.body) {

            let areaWisePhoneNumber = await AreaNumber.find({ areaId: req.body.areaId });
            console.log(areaWisePhoneNumber);
            let updateSurvey = await AreaNumber.updateOne({ areaId: req.body.areaId }, { $set: { surveyId: req.body.surveyId } });
            let surveyData = await Survey.findOne({ _id: req.body.surveyId });
            let message = `Hey this is a survey message 
            Question: ${surveyData.surveyQuestion}
            Answer Options 1: ${surveyData.surveyAnswerOptions[0]}
            Answer Options 2: ${surveyData.surveyAnswerOptions[1]}
            Answer with option either 1 or 2`;

            let sendMessages: any[] = [];

            for (let i = 0; i < areaWisePhoneNumber.length; i++) {
                let data = await axios({
                    method: 'post',
                    url: constVariable.WHATSAPP_API_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${constVariable.TOKEN}`
                    },
                    data: JSON.stringify({
                        "messaging_product": "whatsapp",
                        "to": `91${areaWisePhoneNumber[i].mobileNumber}`,
                        "type": "text",
                        "text": {
                            "body": message
                        }
                    })
                })
                sendMessages.push(data.data);
            }
            if (sendMessages.length === areaWisePhoneNumber.length) {
                return res.status(200).jsend.success({ message: msg.controllers.whatsapp.msgSent });
            }
            return next(new AppError(msg.controllers.whatsapp.msgNotSent, 500));
        }
    })
}

export default whatsapp;

