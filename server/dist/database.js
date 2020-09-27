"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
require('dotenv').config();
exports.pool = new pg_1.Pool({
    user: process.env.POOL_USER,
    host: process.env.POOL_HOST,
    password: process.env.POOL_PASS,
    database: process.env.POOL_DB,
    port: 5432
});
