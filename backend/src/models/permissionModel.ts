import mongoose from 'mongoose';
import validator from 'validator';
import {msg} from '../server'

const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: 'modifiedAt',
  },
};

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, msg.module.insertPermissionName],
      trim:true,
      unique:[true, msg.module.insertPermissionUniqueName],
    },
    resources_roles: [{
        roleId: { type: mongoose.Schema.Types.ObjectId, ref : 'Role' },
        roles_name: { type:  String },
        create: { type: Boolean, default:false },
        delete: { type: Boolean, default:false },
        update: { type: Boolean, default:false },
        read: { type: Boolean, default:false },
      }],
    active: {
      type: Boolean,
      default: true,
    },
  },
  options,
);


const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
