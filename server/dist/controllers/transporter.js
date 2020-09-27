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
exports.mailOptions = (account) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Testing Ethereal + Nodemailer e-mailing service',
        text: 'This is the ' + account + ' we are currently tracking!'
    };
    return mailOptions;
};
