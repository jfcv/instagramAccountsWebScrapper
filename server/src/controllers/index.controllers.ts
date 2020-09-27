import {Request, Response} from 'express'
import {QueryResult} from 'pg'

import {pool} from '../database'

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