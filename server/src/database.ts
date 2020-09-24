import {Pool} from 'pg';

export const pool = new Pool({
    user: 'velveet',
    host: 'localhost',
    password: '',
    database: 'fullstackpern',
    port: 5432
});