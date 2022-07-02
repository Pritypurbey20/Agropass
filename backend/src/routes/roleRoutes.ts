import express from 'express';
import roleController from './../controllers/roleController';
import authController from './../controllers/authController';

const router: any = express.Router();
// Protect all routes after this middleware

//Roles
/**
 * @api {get} /api/v1/roles/:id Get Role information
 * @apiName  getRole
 * @apiGroup Role
 * @query
 * @apiParam {String} id Roles roleId.
 **/
router.get('/:id', [authController.protect], roleController.getRole);
/**
 * @api {delete} /api/v1/roles/:id Delete Role information
 * @apiName  deleteRole
 * @apiGroup Role
 * @query
 * @apiParam {String} id Roles roleId.
 **/
router.delete('/:id', [authController.protect], roleController.deleteMe);
/**
 * @api {post} /api/v1/roles Create Role information
 * @apiName  createRole
 * @apiGroup Role
 * @body
 * @apiParam {String} name Roles Name.
 * @apiParam {String} slug Roles slug Name.
**/
router.post('/' , [authController.protect] , roleController.createRole);
 /**
 * @api {get} /api/v1/roles Get All Roles information
 * @apiName  getAllRoles
 * @apiGroup Role
 * @query
 * @apiParam {String} active Roles active true/false.
**/
router.get('/' , roleController.getAllRoles);
/**
 * @api {put} /api/v1/roles/:id Update Role information
 * @apiName  updateRole
 * @apiGroup Role
 * @query
 * @apiParam {String} id Roles roleId.
 * @body
 * @apiParam {String} name Roles Name.
 * @apiParam {String} slug Roles slug Name.
**/
router.put('/:id',[authController.protect] , roleController.updateRoles);

export default router;
