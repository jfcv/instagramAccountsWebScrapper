import {Request, Response} from 'express'
import {QueryResult} from 'pg'

import {pool} from '../database'

import {transporter, mailOptions} from './transporter';

const puppeteer = require('puppeteer');

export const getAccounts = async (req: Request, res: Response): Promise<Response> => {
    try{        
        const response: QueryResult = await pool.query('SELECT * FROM accounts');
        return res.json(response.rows);
    } catch(err) {
        console.error(err);
        return res.json('error');
    }
}

export const addAccount = async (req: Request, res: Response): Promise<Response> => {
    try {
        let {account} = req.body;
        await pool.query('INSERT INTO accounts (account) VALUES ($1)', [account]);
        const lastAccount: QueryResult = await pool.query('SELECT * FROM accounts WHERE id = (SELECT MAX(id) FROM accounts)');
        return res.json({
            message: 'account added successfully',
            body: lastAccount.rows[0]
        })
    } catch (err) {
        console.error(err);
        return res.json('error');  
    }
}

export const sendMail = async (req: Request, res: Response): Promise<Response> => {

    try {
        /* request parameters */
        const {account} = req.body;

        /* puppeteer code */
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(account);
        await page.waitForSelector('.zwlfE');
        /* account name */
        const name = await page.$eval('.zwlfE div.nZSzR h2', (h2: any) => h2.innerText);
        /* account stats -> [ publications | followers | followed ] */
        let statsArr = [];
        const lis = await page.$$('ul.k9GMp li');
        for (const li of lis) {
            const result = await li.$eval('li.Y8-fY a.-nal3 span.g47SY', (span: any) => span.innerText);
            statsArr.push(result);
        }
        await browser.close();
        
        const mailOptionsObj = mailOptions(account, name, statsArr);
        const info = await transporter.sendMail(mailOptionsObj);
        return res.json({
            message: 'Mail sent successfully',
            body: info
        });
    } catch (err) {
        console.error(err);
        return res.json({
            message: 'Mail service not working !',
            body: err
        });  
    }

}