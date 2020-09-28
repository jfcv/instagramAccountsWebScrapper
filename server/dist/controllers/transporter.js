"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.transporter = void 0;
require('dotenv').config();
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
exports.mailOptions = (account, name, statsArr) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Scrapprtup Daily Report!',
        text: 'Dear customer, we are currently tracking the account: ' + name + '. It has ' + statsArr[0] + ' publications, ' + statsArr[1] + ' account followers '
            + ' & ' + statsArr[2] + ' accounts followed.' + ' If you want to access to this account click on the following link: ' + account + ' Have a nice day Scrapprter!'
    };
    return mailOptions;
};
