import {Pool} from 'pg';

require('dotenv').config();

export const pool = new Pool({
    user: process.env.POOL_USER,
    host: process.env.POOL_HOST,
    password: process.env.POOL_PASS,
    database: process.env.POOL_DB,
    port: 5432
});