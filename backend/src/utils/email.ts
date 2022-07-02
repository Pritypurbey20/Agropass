const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
import { msg } from '../server';
export default class Email {
  firstName: any;
  url: any;
  from: any;
  to: any;
  constructor(user: any, url: any) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    console.log(process.env.SMTP_HOST, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD,)
    return nodemailer.createTransport({
      service: process.env.SMTP_HOST,
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Send the actual email
  async send(template: any, subject: any) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(msg.utils.emails.welcome, msg.utils.emails.welcomeFamily);
  }

  async sendPasswordReset() {
    await this.send(msg.utils.emails.passwordReset, msg.utils.emails.passwordResetToken);
  }
}
