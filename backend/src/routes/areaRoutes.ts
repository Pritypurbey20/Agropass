import express from 'express';
import areaController from './../controllers/areaController';
import authController from './../controllers/authController';

const router: any = express.Router();

//Area 

/**
 * @api {get} /api/v1/areas/:id Get Area information
 * @apiName  getArea
 * @apiGroup Area
 * @query
 * @apiParam {String} id Area areaId.
 */

router.get('/:id', [authController.protect], areaController.getArea);

/**
 * @api {delete} /api/v1/areas/:id Delete Area information
 * @apiName  deleteArea
 * @apiGroup Area
 * @query
 */

router.delete('/:id', [authController.protect], areaController.deleteArea);

/**
 * @api {get} /api/v1/areas Get all Areas
 * @apiName  getAllAreas
 * @apiGroup Area
 * @query
 */

router.get('/', [authController.protect], areaController.getAllAreas);


/**
 * @api {post} /api/v1/areas Create Area
 * @apiName  createArea
 * @apiGroup Area
 * @body
 */

router.post('/', [authController.protect], areaController.createArea);


/**
 * @api {put} /api/v1/areas/:id Update Area
 * @apiName  updateArea
 * @apiGroup Area
 * @body
 * @query
 * @apiParam {String} id Area areaId.
 * 
 */

router.put('/:id', [authController.protect], areaController.updateArea);

export default router;
