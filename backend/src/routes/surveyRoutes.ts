import express from 'express';
import surveyController from '../controllers/surveyController';
import authController from '../controllers/authController';

const router: any = express.Router();
// Protect all routes after this middleware

//Surveys
/**
 * @api {get} /api/v1/surveys/:id Get Survey information
 * @apiName  getSurvey
 * @apiGroup Survey
 * @query
 * @apiParam {String} id Surveys surveyId.
 **/

router.get('/:id', [authController.protect], surveyController.getSurvey);

/**
 * @api {delete} /api/v1/surveys/:id Delete Survey information
 * @apiName  deleteSurvey
 * @apiGroup Survey
 * @query
 * @apiParam {String} id Survey roleId.
 **/

router.delete('/:id', [authController.protect], surveyController.deleteSurvey);

/**
 * @api {post} /api/v1/surveys Create Survey information
 * @apiName  createSurvey
 * @apiGroup Survey
 * @body
 */

router.post('/', [authController.protect], surveyController.createSurvey);

/**
 * @api {get} /api/v1/surveys Get All Surveys information
 * @apiName  getAllSurveys
 * @apiGroup Survey
 * @query
 */

router.get('/', [authController.protect], surveyController.getAllSurveys);   

/**
 * @api {put} /api/v1/surveys/:id Update Survey information
 * @apiName  updateSurvey
 * @apiGroup Survey
 * @body
 * @apiParam {String} id Survey surveyId.
 * */

router.put('/:id', [authController.protect], surveyController.updateSurvey);

export default router;


