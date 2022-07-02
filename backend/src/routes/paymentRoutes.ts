import express from 'express';
import paymentController from '../controllers/paymentController';
import authController from '../controllers/authController';

const router: any = express.Router();

//Payment

/**
 * @api {get} /api/v1/payments/:id Get Payment information
 * @apiName  getPayment
 * @apiGroup Payment
 * @query
 */

router.get('/:id', [authController.protect], paymentController.getPayment);

/**
 * @api {delete} /api/v1/payments/:id Delete Payment information
 * @apiName  deletePayment
 * @apiGroup Payment
 * @query
 */

router.delete('/:id', [authController.protect], paymentController.deletePayment);

/**
 * @api {post} /api/v1/payments Create Payment information
 * @apiName  createPayment
 * @apiGroup Payment
 * @body
 */

router.post('/' , [authController.protect] , paymentController.createPayment);

/**
 * @api {get} /api/v1/payments Get All Payments information
 * @apiName  getAllPayments
 * @apiGroup Payment
 * @query
 */

router.get('/',[authController.protect] , paymentController.getAllPayments);

export default router;