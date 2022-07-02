import express from 'express';
import cropController from './../controllers/cropController';
import authController from './../controllers/authController';
import {upload} from '../middleware/uploadFile';

const router: any = express.Router();
// Protect all routes after this middleware

//Crops
/**
 * @api {get} /api/v1/crops/:id Get Crop information
 * @apiName  getCrop
 * @apiGroup Crop
 * @query
 * @apiParam {String} id Crops cropId.
 * 
 **/

router.get('/:id', [authController.protect], cropController.getCrop);

/**
 * @api {delete} /api/v1/crops/:id Delete Crop information
 * @apiName  deleteCrop
 * @apiGroup Crop
 * @query
 * @apiParam {String} id Crops cropId.
 **/

router.delete('/:id', [authController.protect], cropController.deleteCrop);

/**
 * 
 * @api {post} /api/v1/crops Create Crop information
 * @apiName  createCrop
 * @apiGroup Crop
 * @body
 **/


router.post('/' , [authController.protect, upload.any()] , cropController.createCrop);

/**
 * @api {put} /api/v1/crops/:id Update Crop information
 * @apiName  updateCrop
 * @apiGroup Crop
 * @query
 */

router.put('/:id',[authController.protect ,  upload.any()] , cropController.updateCrop);

/**
 * @api {get} /api/v1/crops/:id Get All Crops information
 * @apiName  getAllCrops
 * @apiGroup Crop
 * @query
 * @apiParam {String} active Crops active true/false.
 * @apiParam {String} cropType Crops cropId.
 **/

router.get('/' ,[authController.protect], cropController.getAllCrops);

/**
 * @api {post} /api/v1/crops/uploadCropImage/:id upload Crop Image
 * @apiName  uploadCropImage
 * @apiGroup Crop
 * @query
 * @apiParam {String} id Crops cropId.
 * @apiParam {String} cropImage Crops cropImage.
 **/

router.post('/uploadCropImage/:id',[authController.protect , upload.any()] , cropController.cropImageUpload);

export default router;
