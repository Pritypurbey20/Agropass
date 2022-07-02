import multer from 'multer';
import sharp from 'sharp';
import User from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import { constVariable } from '../utils/const';
import { AppError } from './../utils/appError';
import factory from './handlerFactory';
import { NextFunction } from 'express';
import { msg } from '../server';
const multerStorage = multer.memoryStorage();

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(msg.controllers.user.notAnImage, constVariable.HTTP.BADREQUEST), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const filterObj = (obj: any, ...allowedFields: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const user = {
  uploadUserPhoto: upload.single('photo'),

  resizeUserPhoto: catchAsync(async (req: any, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(constVariable.HTTP.FORBIDDEN, constVariable.HTTP.FORBIDDEN).toFormat('jpeg').jpeg({ quality: constVariable.IMAGEQUALITY }).toFile(`${constVariable.USERIMAGEFILEPATH}${req.file.filename}`);

    next();
  }),

  getMe: (req: any, res: any, next: NextFunction) => {
    req.params.id = req.user.id;
    next();
  },

  updateMe: catchAsync(async (req: any, res: any, next: NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError(msg.controllers.user.noPasswordUpdates, constVariable.HTTP.BADREQUEST));
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body,constVariable.FIRSTNAME,constVariable.LASTNAME);
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(constVariable.HTTP.OK).jsend.success(updatedUser);
  }),

  deleteMe: catchAsync(async (req: any, res: any, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(constVariable.HTTP.NOCONTENT).jsend.success({
      data: msg.controllers.user.success,
    });
  }),
  createUser: factory.createOne(User),
  getUser: factory.getOne(User),
  getAllUsers: factory.getAll(User),

  // Do NOT update passwords with this!
  updateUser: factory.updateOne(User),
  deleteUser: factory.deleteOne(User),
};

export default user;
