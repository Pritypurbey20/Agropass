import express from 'express';
import areaNumberController from '../controllers/areaNumberConroller';
import authController from './../controllers/authController';

const router: any = express.Router();

// Area number 

/**
 * @api {get} /api/v1/areaNumbers/:id Get Area Number information
 * @apiName  getAreaNumber
 * @apiGroup Area Number
 * @query
 */

router.get('/:id', [authController.protect], areaNumberController.getAreaNumber);

/**
 * @api {delete} /api/v1/areaNumbers/:id Delete Area Number information
 * @apiName  deleteAreaNumber
 * @apiGroup Area Number
 * @query
 */

router.delete('/:id', [authController.protect], areaNumberController.deleteAreaNumber);

/**
 * @api {post} /api/v1/areaNumbers Create Area Number information
 * @apiName  createAreaNumber
 * @apiGroup Area Number
 * @body
 */

router.post('/' , [authController.protect] , areaNumberController.createAreaNumber);

/**
 * @api {get} /api/v1/areaNumbers Get All Area Numbers information
 * @apiName  getAllAreaNumbers
 * @apiGroup Area Number
 * @query
 */

router.get('/',[authController.protect] , areaNumberController.getAllAreaNumbers);

/**
 * @api {put} /api/v1/areaNumbers/:id Update Area Number information
 * @apiName  updateAreaNumber
 * @apiGroup Area Number
 * @query
 * @body
 */

router.put('/:id',[authController.protect] , areaNumberController.updateAreaNumber);

export default router;