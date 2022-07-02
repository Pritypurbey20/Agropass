import express from 'express';
import farmController from './../controllers/farmController';
import authController from './../controllers/authController';

const router: any = express.Router();

//Farm

/**
 * @api {get} /api/v1/farms/:id Get Farm information
 * @apiName  getFarm
 * @apiGroup Farm
 * @query
 * @apiParam {String} id Farms farmId.
 */

router.get('/:id', [authController.protect], farmController.getFarm);

/**
 * @api {delete} /api/v1/farms/:id Delete Farm information
 * @apiName  deleteFarm
 * @apiGroup Farm
 * @query
 * @apiParam {String} id Farms farmId.
 */

router.delete('/:id', [authController.protect], farmController.deleteFarm);

/**
 * @api {post} /api/v1/farms Create Farm information
 * @apiName  createFarm
 * @apiGroup Farm
 * @body
 */

router.post('/' , [authController.protect] , farmController.createFarm);

/**
 * @api {get} /api/v1/farms Get All Farms information
 * @apiName  getAllFarms
 * @apiGroup Farm
 * @query
 */

router.get('/',[authController.protect] , farmController.getAllFarms);


/**
 * @api {put} /api/v1/farms/:id Update Farm information
 * @apiName  updateFarm
 * @apiGroup Farm
 * @query
 */

router.put('/:id',[authController.protect] , farmController.updateFarm);

export default router;