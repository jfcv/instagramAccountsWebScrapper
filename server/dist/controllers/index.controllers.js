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
const transporter_1 = require("./transporter");
const puppeteer = require('puppeteer');
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
        /* request parameters */
        const { account } = req.body;
        /* puppeteer code */
        const browser = yield puppeteer.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.goto(account);
        yield page.waitForSelector('.zwlfE');
        /* account name */
        const name = yield page.$eval('.zwlfE div.nZSzR h2', (h2) => h2.innerText);
        /* account stats -> [ publications | followers | followed ] */
        let statsArr = [];
        const lis = yield page.$$('ul.k9GMp li');
        for (const li of lis) {
            const result = yield li.$eval('li.Y8-fY a.-nal3 span.g47SY', (span) => span.innerText);
            statsArr.push(result);
        }
        yield browser.close();
        const mailOptionsObj = transporter_1.mailOptions(account, name, statsArr);
        const info = yield transporter_1.transporter.sendMail(mailOptionsObj);
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
