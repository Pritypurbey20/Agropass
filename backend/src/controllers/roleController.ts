import sharp from 'sharp';
import Role from './../models/roleModel';
import User from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import { constVariable } from '../utils/const';
import { AppError } from './../utils/appError';
import factory from './handlerFactory';
import { NextFunction } from 'express';
import { msg } from '../server';
import user from './userController';

const role = {
  getMe: (req: any, res: any, next: NextFunction) => {
    req.params.id = req.user.id;
    next();
  },
  //delete role
  deleteMe: catchAsync(async (req: any, res: any, next: NextFunction) => {
    let checkRoleExist = await User.find({"roleId":req.params.id});
    if(checkRoleExist && checkRoleExist.length > 0){
      return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
        message: msg.controllers.role.roleExistInUser,
      });
    }else{
     const roleExist = await User.findOne({roleId:req.params.id})
      if(roleExist != null){
        return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({message:msg.controllers.role.roleIsAssignedToUser});
      }
      await Role.findByIdAndUpdate(req.params.id, { active: false });
      return res.status(constVariable.HTTP.OK).jsend.success({
        data: msg.controllers.role.success,
      });
    }
  }),
  //update role
  updateRole: catchAsync(async (req:any ,res:any,next:NextFunction) => {
    let checkRoleExist = await Role.findOne({"name" : req.body.name});
    if(checkRoleExist){
      res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
        message: msg.controllers.role.roleAlreadyExist,
      });
    }
    else{
      await Role.findByIdAndUpdate(req.params.id , req.body);
      res.status(constVariable.HTTP.OK).jsend.success({
        data: msg.controllers.role.success,
      });
    }
  }),
  //create role
  createRole: factory.createOne(Role),
  //get role
  getRole: factory.getOne(Role),
  //get all roles
  getAllRoles: factory.getAll(Role),
  //update all roles
  updateRoles: factory.updateOne(Role)
};

export default role;
