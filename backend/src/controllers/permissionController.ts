import sharp from 'sharp';
import Permission from './../models/permissionModel';
import catchAsync from './../utils/catchAsync';
import { constVariable } from '../utils/const';
import { AppError } from './../utils/appError';
import factory from './handlerFactory';
import { NextFunction } from 'express';
import { msg } from '../server';
import role from './roleController';
import Role from './../models/roleModel';

const permission = {
  getMe: (req: any, res: any, next: NextFunction) => {
    req.params.id = req.user.id;
    next();
  },
  //delete permission
  deleteMe: catchAsync(async (req: any, res: any, next: NextFunction) => {
    const permissionExist = await Permission.findOne({ _id: req.params.id })
    if (permissionExist == null) {
      return res.status(constVariable.HTTP.NOTFOUND).jsend.error({
        message: msg.controllers.permission.permissionNotFound,
      });
    }
    permissionExist.resources_roles.forEach(async (element: any) => {
      const role = await Role.findOne({ _id: element.roleId })

      if (role.active) {
        return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
          message: msg.controllers.permission.permissionCanNotDelete,
        });
      }
    })

    await Permission.findByIdAndUpdate(req.params.id, { active: false });
    res.status(constVariable.HTTP.OK).jsend.success({
      data: msg.controllers.permission.success,
    });
  }),
  //create permission
  createPermission: catchAsync(async (req: any, res: any, next: NextFunction) => {
    let permisssionExist = await Permission.findOne({ name: req.body.name }, { active: true });
    if (permisssionExist) {
      let permisssionRoleIdExist = await Permission.findOne({ name: req.body.name, resources_roles: { $elemMatch: { roleId: req.user.roleId } } }, { active: true });
      if (permisssionRoleIdExist) {
        return res.status(constVariable.HTTP.FORBIDDEN).jsend.error({
          message: msg.controllers.permission.permissionAlreadyExist,
        });
      } else {
        const doc = await Permission.findOneAndUpdate(
          { "name": req.body.name },
          { "$push": { "resources_roles": { "$each": req.body.resources_roles } } }
        )
        return res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.permission.success });
      }
    } else {
      const doc = await Permission.create(req.body);
      return res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.permission.success });
    }
  }),
  //update permission
  updatePermission: catchAsync(async (req: any, res: any, next: NextFunction) => {
    console.log(req.body)
    if (!req.params.id) {
      return res.status(constVariable.HTTP.NOTFOUND).jsend.error({ message: msg.controllers.permission.permissionIdRequired })
    }
    if (!req.body.roleId) {
      return res.status(constVariable.HTTP.NOTFOUND).jsend.error({ message: msg.controllers.role.roleIdRequired })
    }

    let permisssionExist = await Permission.findOne({ _id: req.params.id });
    console.log(permisssionExist)
    if (!permisssionExist) {
      return res.status(constVariable.HTTP.NOTFOUND).jsend.error({ message: msg.controllers.permission.permissionNotFound })
    } else {
      await Permission.updateOne({ _id: req.params.id, 'resources_roles.roleId': req.body.roleId }, {
        '$set': {
          'resources_roles.$.create': req.body.create,
          'resources_roles.$.delete': req.body.delete,
          'resources_roles.$.update': req.body.update,
          'resources_roles.$.read': req.body.read,
        }
      });
      return res.status(constVariable.HTTP.OK).jsend.success({ message: msg.controllers.permission.success });
    }
  }),
  //get permission
  getPermission: factory.getOne(Permission),
  //get all permissions
  getAllPermissions: factory.getAll(Permission),
};

export default permission;