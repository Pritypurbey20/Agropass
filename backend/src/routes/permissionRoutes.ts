import express from 'express';
import permissionController from './../controllers/permissionController';
import authController from './../controllers/authController';

const router: any = express.Router();
// Protect all routes after this middleware

//Permissions
/**
 * @api {get} /api/v1/permissions/:id Get permission information
 * @apiName  getPermission
 * @apiGroup Permission
 * @query
 * @apiParam {String} id permissions permissionId.
 **/
router.get('/:id', [authController.protect], permissionController.getPermission);
/**
 * @api {delete} /api/v1/permissions:id Delete Permission information
 * @apiName  deletePermission
 * @apiGroup Permission
 * @query
 * @apiParam {String} id Permissions permissionId.
 **/
router.delete('/:id', [authController.protect], permissionController.deleteMe);
//Get all permissions
/**
 * @api {get} /api/v1/permissions Get All permissions information
 * @apiGroup Permission
 * @query
 * @apiParam {String} active permissions active true/false.
**/
router.get('/', [authController.protect], permissionController.getAllPermissions);
/**
 * @api {post} /api/v1/permissions Create Permission information
 * @apiName  createPermission
 * @apiGroup Permission
 * @body
 * @apiParam {String} name permissions Name.
 * @apiParam {Array} resource_roles permissions resource_roles.
**/
router.post('/', [authController.protect], permissionController.createPermission);
/**
 * @api {put} /api/v1/permissions Update Permission information
 * @apiName  updatePermission
 * @apiGroup Permission
 * @body
 * @apiParam {String} name permissions Name.
 * @apiParam {Array} resource_roles permissions resource_roles.
**/
router.put('/:id' , [authController.protect] , permissionController.updatePermission)

export default router;
