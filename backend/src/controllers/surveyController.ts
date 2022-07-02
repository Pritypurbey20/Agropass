import Survey from "../models/surveyModel";
import { msg } from "../server";
import { constVariable } from "../utils/const";
import factory from "./handlerFactory";
import { NextFunction } from "express";

const survey = {
    //create survey
    createSurvey: factory.createOne(Survey),

    //get survey
    getSurvey: factory.getOne(Survey),

    //get all surveys
    getAllSurveys: factory.getAll(Survey),

    //update survey
    updateSurvey: factory.updateOne(Survey),

    //delete survey
    deleteSurvey: factory.deleteOne(Survey),
}

export default survey;
