import mongoose from 'mongoose';
import {msg} from '../server'

const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: 'modifiedAt',
  },
};

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique : [true, msg.module.insertRoleUniqueName],
      trim : true,
      index : true,
      required: [true, msg.module.insertRoleName],
    },

    slug: {
      type: String,
      required: [true, msg.module.insertRoleSlug],
    },
    active: {
      type: Boolean,
      default: true,
      //select: false,
    },
  },
  options,
);


const Role = mongoose.model('Role', roleSchema);

export default Role;
