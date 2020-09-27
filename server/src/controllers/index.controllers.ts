import {Request, Response} from 'express'
import {QueryResult} from 'pg'

import {pool} from '../database'

require('dotenv').config();
import sgMail from '@sendgrid/mail';

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
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
        to: 'velveet@protonmail.com',
        from: 'velveet@protonmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        await sgMail.send(msg);
        return res.json('mail sent successfully'); 
    } catch (err) {
        console.error(err);
        return res.json('Mail service not working !');  
    }
}