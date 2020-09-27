"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.addAccount = exports.getAccounts = void 0;
const database_1 = require("../database");
require('dotenv').config();
const nodemailer = require("nodemailer");
exports.getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM accounts');
        return res.json(response.rows);
    }
    catch (err) {
        console.error(err);
        return res.json('error');
    }
});
exports.addAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { account } = req.body;
        yield database_1.pool.query('INSERT INTO accounts (account) VALUES ($1)', [account]);
        const lastAccount = yield database_1.pool.query('SELECT * FROM accounts WHERE id = (SELECT MAX(id) FROM accounts)');
        return res.json({
            message: 'account added successfully',
            body: lastAccount.rows[0]
        });
    }
    catch (err) {
        console.error(err);
        return res.json('error');
    }
});
exports.sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //script for web scrapping that web page & getting the right info
    //output variables ACCOUNT NAME, PUBLICATIONS, FOLLOWERS, FOLLOWING
    //concatenate values && send them to the mail
    //find an alternative to sendgrid that allows to REALLY received the mail 
    try {
        console.log(req.body);
        const { account } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Testing Ethereal + Nodemailer e-mailing service',
            text: 'This is the ' + account + ' we are currently tracking!'
        };
        const info = yield transporter.sendMail(mailOptions);
        return res.json({
            message: 'Mail sent successfully',
            body: info
        });
    }
    catch (err) {
        console.error(err);
        return res.json({
            message: 'Mail service not working !',
            body: err
        });
    }
});
