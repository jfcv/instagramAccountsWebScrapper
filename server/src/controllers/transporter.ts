require('dotenv').config();
const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const mailOptions = (account: string) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Testing Ethereal + Nodemailer e-mailing service',
        text: 'This is the ' + account + ' we are currently tracking!'
    }
    return mailOptions
}