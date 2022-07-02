import jwt from 'jsonwebtoken';
import { constVariable } from '../utils/const';


const { JWT_SECRET } = require('../config/index');

const jwtToken = {
  createToken: async (data: any) => {
    let token = jwt.sign(data, JWT_SECRET, {
      expiresIn: `${constVariable.EXPIRETIME}`,
    });

    return token;
  },
};
export default jwtToken;
