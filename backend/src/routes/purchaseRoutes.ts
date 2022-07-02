import express from 'express';
import purchaseController from '../controllers/purchaseController';
import authController from '../controllers/authController';

const router: any = express.Router();

// Purchase

/**
 * @api {get} /api/v1/purchases/:id Get Purchase information
 * @apiName  getPurchase
 * @apiGroup Purchase
 * @query
 */

router.get('/:id', [authController.protect], purchaseController.getPurchase);

/**
 * @api {delete} /api/v1/purchases/:id Delete Purchase information
 * @apiName  deletePurchase
 * @apiGroup Purchase
 * @query
*/

router.delete('/:id', [authController.protect], purchaseController.deletePurchase);

/**
 * @api {get} /api/v1/purchases Get all Purchases
 * @apiName  getAllPurchases
 * @apiGroup Purchase
 * @query
*/

router.get('/', [authController.protect], purchaseController.getAllPurchases);

/**
 * @api {post} /api/v1/purchases Create Purchase
 * @apiName  createPurchase
 * @apiGroup Purchase
 * @body
*/

router.post('/', [authController.protect], purchaseController.createPurchase);

/**
 * @api {put} /api/v1/purchases/:id Update Purchase
 * @apiName  updatePurchase
 * @apiGroup Purchase
 * @body
 * @query
*/

router.put('/:id', [authController.protect], purchaseController.updatePurchase);

export default router;