import express from 'express';
import userController from './../controllers/userController';
import authController from './../controllers/authController';

const router: any = express.Router();
//Signup
router.post('/signup', authController.signup);
//Login
router.post('/login', authController.login);
//Logout
router.get('/logout', authController.logout);
//Forgot password
router.post('/forgotPassword', authController.forgotPassword);
//Reset Password
router.patch('/resetPassword/:token', authController.resetPassword);
// Protect all routes after this middleware

//Update password
router.patch('/updateMyPassword', authController.protect,authController.permissionCheck, authController.updatePassword);
/**
 * @api {get} /api/v1/users Get All Users information
 * @apiGroup Users
 * @query
 * @apiParam {String} active Users active true/false.
 * @apiParam {String} search Users search keyword.
 * @apiParam {Number} page Users page no.
 * @apiParam {Number} size Users per page records length.
 * @apiParam {String} sort Users asc/desc.
 * @apiParam {String} permissionId Users permission checked in middleware.
 **/
router.get('/', [authController.protect,authController.permissionCheck], userController.getAllUsers);
/**
 * @api {post} /api/v1/users Create Users information
 * @apiName  createUsers
 * @apiGroup Users
 * @body
 * @apiParam {String} password Users Password.
 * @apiParam {String} passwordConfirm Users Password confirmation.
 * @apiParam {String} email User Email.
 * @apiParam {String} firstName User firstName.
 * @apiParam {String} lastName User lastName.
 * @apiParam {String} roleId User roleId.
 * @apiParam {String} permissionId Users permission checked in middleware.
 **/
router.post('/' , [authController.protect,authController.permissionCheck] , userController.createUser);

router.get('/me',authController.protect , userController.getMe, userController.getUser);

router.patch('/updateMe', authController.protect, userController.updateMe);

/**
 * @api {get} /api/v1/users/:id Get Users information
 * @apiName  getUser
 * @apiGroup Users
 * @query
 * @apiParam {String} id User userId.
 * @apiParam {String} permissionId Users permission checked in middleware.
 **/
router.get('/:id', [authController.protect,authController.permissionCheck] , userController.getUser);
/**
 * @api {post} /api/v1/users/:id Update Users information
 * @apiName  updateUsers
 * @apiGroup Users
 * @body
 * @apiParam {String} firstName User firstName.
 * @apiParam {String} lastName User lastName.
 * @apiParam {String} roleId User roleId.
 * @query
 * @apiParam {String} id User userId.
 * @apiParam {String} permissionId Users permission checked in middleware.
 **/
router.patch('/:id' , [authController.protect,authController.permissionCheck] , userController.updateUser);
/**
 * @api {delete} /api/v1/users/:id Delete User information
 * @apiName  deleteUser
 * @apiGroup Users
 * @query
 * @apiParam {String} id User userId.
 * @apiParam {String} permissionId Users permission checked in middleware.
 **/
router.delete('/:id', [authController.protect,authController.permissionCheck] ,userController.deleteUser);

export default router;
