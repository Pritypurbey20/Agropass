import nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';
import { EMAIL_HOST, EMAIL_PASS } from '../config/index';
import { constVariable } from '../utils/const';
import {en} from '../utils/en-in';

const emailSender = {
  sender: async (password: any, email: any) => {
    try {
      const transporter = nodemailer.createTransport({
        service: `${constVariable.EMAIL_SERVICE}`,
        auth: {
          user: EMAIL_HOST,
          pass: EMAIL_PASS,
        },
      });
      const subject = en.controllers.auth.emailAccountCreated;
      const template = fs.readFileSync('./src/views/email.ejs', 'utf-8');
      const html = ejs.render(template, { email, password });
      const mailContent = {
        to: email,
        from: EMAIL_HOST, // Use the email address or domain you verified above
        subject,
        html,
      };
      transporter.sendMail(mailContent, function (err, info) {
        if (err) {
          console.log(err);
        } else {
        }
      });
    } catch (err) {
      console.log(err);
      // return res.status(constVariable.HTTP.FORBIDDEN).send({ status: 'ERROR', message: 'can not send mail' });
    }
  },
};

export default emailSender;
