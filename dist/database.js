"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'velveet',
    host: 'localhost',
    password: '',
    database: 'fullstackpern',
    port: 5432
});
