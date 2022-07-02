import express from 'express';
import cropTypeController from '../controllers/cropTypeController';
import authController from './../controllers/authController';

const router: any = express.Router();

//Crop Type 

/**
 * @api {get} /api/v1/cropTypes/:id Get Crop Type information
 * @apiName  getCropType
 * @apiGroup Crop Type
 * @query
 */

router.get('/:id', [authController.protect], cropTypeController.getCropType);

/**
 * @api {delete} /api/v1/cropTypes/:id Delete Crop Type information
 * @apiName  deleteCropType
 * @apiGroup Crop Type
 * @query
*/

router.delete('/:id', [authController.protect], cropTypeController.deleteCropType);

/**
 * @api {post} /api/v1/cropTypes Create Crop Type information
 * @apiName  createCropType
 * @apiGroup Crop Type
 * @body
 */

router.post('/' , [authController.protect] , cropTypeController.createCropType);


/**
 * @api {get} /api/v1/cropTypes Get All Crop Types information
 * @apiName  getAllCropTypes
 * @apiGroup Crop Type
 * @query
 */

router.get('/',[authController.protect] , cropTypeController.getAllCropTypes);


/**
 * @api {put} /api/v1/cropTypes/:id Update Crop Type information
 * @apiName  updateCropType
 * @apiGroup Crop Type
 * @query
 */

router.put('/:id',[authController.protect] , cropTypeController.updateCropType);
export default router;
