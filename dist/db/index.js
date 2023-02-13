"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const chalk_1 = __importDefault(require("chalk"));
// Database config for development
const devConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT)
};
// Database config for production
const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
// Create a new connection
const pool = new pg_1.Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);
// Testing connection
pool.query('SELECT NOW()')
    .then(() => console.log(chalk_1.default.cyan.underline(`Postgres connection established`)))
    .catch(() => console.log(chalk_1.default.red.bold(`Postgres failed to connect`)));
exports.default = pool;
