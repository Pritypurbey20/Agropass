import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import User from '../models/userModel';
import Permission from '../models/permissionModel';
import Role from '../models/roleModel';

import catchAsync from './../utils/catchAsync';
import { AppError } from '../utils/appError';
import Email from '../utils/email';
import { msg } from '../server';
import { NextFunction, Request, Response } from 'express';
import { constVariable } from '../utils/const';
import { RESET_PASSWORD_ENDPOINT } from '../config/index';

const { JWT_SECRET, JWT_COOKIE_EXPIRES_IN } = require('../config/index');

const signToken = (id: any) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, permissions: any, statusCode: any, req: any, res: any) => {
  // Remove password from output
  user.password = undefined;
  const token = signToken(user);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * constVariable.JWTEXPIREDINTIME),
    httpOnly: true,
    secure: req.secure || req.headers[constVariable.HTTP.XFORWARDEDPROTO] === constVariable.HTTP.HTTPS,
  });

  res.status(statusCode).jsend.success({ token, permissions });
};

const auth = {
  signup: catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let roleId = '';

    let roleDetail = await Role.findOne({ name: "user", active: true });
    roleId = roleDetail._id;

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      roleId: roleId
    });
    const permissions = await Permission.find({ resources_roles: { $elemMatch: { roleId: roleId } } }).select("_id name");
    const url = `${req.protocol}://${req.get('host')}/me`;
    // await new Email(newUser, url).sendWelcome();
    createSendToken(newUser, permissions, constVariable.HTTP.OK, req, res);
  }),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError(msg.controllers.auth.passwordAndEmailRequire, constVariable.HTTP.BADREQUEST));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError(msg.controllers.auth.incorrectPasswordOrEmail, constVariable.HTTP.UNAUTHORIZED));
    }
    const permissions = await Permission.find({ resources_roles: { $elemMatch: { roleId: user.roleId } } }).select("_id name");
    createSendToken(user, permissions, constVariable.HTTP.OK, req, res);
  }),

  logout: (req: Request, res: Response) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.auth.success });
  },

  protect: catchAsync(async (req: any, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    if (!req.headers.authorization) {
      return next(new AppError(msg.controllers.auth.youAreNotLoggedIn, constVariable.HTTP.NOTFOUND));
    }
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith(constVariable.HTTP.BEARER)) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError(msg.controllers.auth.youAreNotLoggedIn, constVariable.HTTP.UNAUTHORIZED));
    }

    // 2) Verification token
    const decoded: any = await jwt.verify(token, JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError(msg.controllers.auth.userBelongToThisTokenDeleted, constVariable.HTTP.UNAUTHORIZED));
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError(msg.controllers.auth.userRecentlyChangedPassword, constVariable.HTTP.UNAUTHORIZED));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }),
  permissionCheck: catchAsync(async (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
      const module = req.originalUrl.split("/", 4);
      // if (!req.query.permissionId) {
      //   return next(new AppError(msg.controllers.permission.permissionIdRequired, constVariable.HTTP.BADREQUEST));
      // }
      // get permission handler name //&& req.query.permissionId
      let filter = {};
      if (req && req.user && req.user.roleId ) {
        filter = {
          name: module[3],
          resources_roles: { $elemMatch: { roleId: req.user.roleId } }
        };
      }
      const doc = await Permission.findOne(filter);

      if (!doc) {
        return next(new AppError(msg.controllers.handlerFactory.noDocumentFound, constVariable.HTTP.NOTFOUND));
      }
      let perm = doc.resources_roles.find((i: { roleId: any; }) => i.roleId.toString() === req.user.roleId.toString())
      var allow = false;
      // mapping of methods to permissions
      if (req.method == constVariable.HTTP.METHOD.POST && perm.create === true) {
        allow = true;
      }
      else if (req.method == constVariable.HTTP.METHOD.GET && perm.read === true) {
        allow = true;
      }
      else if ((req.method == constVariable.HTTP.METHOD.PUT || req.method == constVariable.HTTP.METHOD.PATCH)
        && perm.update === true) {
        allow = true;
      }
      else if (req.method == constVariable.HTTP.METHOD.DELETE && perm.delete === true) {
        allow = true;
      }

      if (allow) next();
      else {
        return next(new AppError(msg.controllers.auth.accessDenied, constVariable.HTTP.UNAUTHORIZED));
      }
    }
    else {
      return next(new AppError(msg.controllers.auth.youAreNotLoggedIn, constVariable.HTTP.UNAUTHORIZED));
    }
  }),

  // Only for rendered pages, no errors!
  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded: any = jwt.verify(req.cookies.jwt, JWT_SECRET);
        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
        // 3) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }
        // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        return next();
      } catch (err: any) {
        return next();
      }
    }
    next();
  },

  forgotPassword: catchAsync(async (req: Request, res: Response, next: any) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError(msg.controllers.auth.emailDoesNotExist, constVariable.HTTP.NOTFOUND));
    }
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    console.log(user)
    // 3) Send it to user's email
    try {
      const resetURL = `${req.protocol}://${req.get('host')}/${RESET_PASSWORD_ENDPOINT}/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();

      res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.auth.tokenSentToEmail });
    } catch (err: any) {
      console.log(err);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new AppError(msg.controllers.auth.errorInSendingEmail, constVariable.HTTP.SERVERERROR));
    }
  }),

  resetPassword: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.token) {
      return next(new AppError(msg.controllers.auth.tokenIsInvalid, constVariable.HTTP.NOTFOUND));
    }
    // 1) Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError(msg.controllers.auth.tokenIsInvalid, constVariable.HTTP.BADREQUEST));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const permissions: never[] = [];
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, permissions, constVariable.HTTP.OK, req, res);
  }),

  updatePassword: catchAsync(async (req: any, res: Response, next: any) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError(msg.controllers.auth.yourCurrentPasswordIsIncorrect, constVariable.HTTP.UNAUTHORIZED));
    }
    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!
    const permissions: never[] = [];
    // 4) Log user in, send JWT
    createSendToken(user, permissions, constVariable.HTTP.OK, req, res);
  }),
};

export default auth;
