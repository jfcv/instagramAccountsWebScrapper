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
    try {
        console.log(req.body);
        /*         sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
                const msg = {
                to: 'velveet@protonmail.com',
                from: 'velveet@protonmail.com',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                };
                await sgMail.send(msg); */
        return res.json('mail sent successfully');
    }
    catch (err) {
        console.error(err);
        return res.json('Mail service not working !');
    }
});
