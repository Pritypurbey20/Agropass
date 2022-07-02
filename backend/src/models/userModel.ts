import crypto from 'crypto';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import {msg} from '../server'
import { constVariable } from '../utils/const';

const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: 'modifiedAt',
  },
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, msg.module.insertFirstName],
    },

    lastName: {
      type: String,
      required: [true, msg.module.insertLastName],
    },

    email: {
      type: String,
      required: [true, msg.module.insertEmail],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, msg.module.insertValidEmail],
    },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref : 'Role' },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (this: any, el: any) {
          return el === this.password;
        },
        message: msg.module.passwordNotSame,
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      // select: false,
    },
    contactNumber: {
      type: Number,
      require: true,
    },
    amount : {
      type: Number,
      default: 100,
    }
  },
  options,
);

userSchema.pre('save', async function (this: any, next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (this: any, next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (this: any, next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (this: any, candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (this: any, JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function (this: any) {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash(constVariable.HASH.SHA256).update(resetToken).digest('hex');
  this.passwordResetExpires = constVariable.PASSWORD_RESET_EXPIRATION;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
