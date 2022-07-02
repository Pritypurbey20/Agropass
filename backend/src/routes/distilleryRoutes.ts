import express from 'express';
import distilleryController from '../controllers/distilleryController';
import authController from '../controllers/authController';

const router: any = express.Router();

/**
 * @api {get} /api/v1/distilleries/:id Get Distillery information
 * @apiName  getDistillery
 * @apiGroup Distillery
 * @query
 */

router.get('/:id', [authController.protect], distilleryController.getDistillery);

/**
 * @api {delete} /api/v1/distilleries/:id Delete Distillery information
 * @apiName  deleteDistillery
 * @apiGroup Distillery
 * @query
 */

router.delete('/:id', [authController.protect], distilleryController.deleteDistillery);

/**
 * @api {get} /api/v1/distilleries Get all Distilleries
 * @apiName  getAllDistilleries
 * @apiGroup Distillery
 * @query
 */

router.get('/', [authController.protect], distilleryController.getAllDistilleries);

/**
 * @api {post} /api/v1/distilleries Create Distillery
 * @apiName  createDistillery
 * @apiGroup Distillery
 * @body
 */

router.post('/', [authController.protect], distilleryController.createDistillery);

/**
 * @api {put} /api/v1/distilleries/:id Update Distillery
 * @apiName  updateDistillery
 * @apiGroup Distillery
 * @body    
 * @query
 */

router.put('/:id', [authController.protect], distilleryController.updateDistillery);

/**
 * @api {get} /api/v1/distilleries/all Get all Purchases of Distillery
 * @apiName  getDistilleries
 * @apiGroup Distillery
 */

router.get('/all/distilleries', [authController.protect], distilleryController.getDistilleries);

export default router