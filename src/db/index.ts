import {Pool} from 'pg'
import chalk from 'chalk'

// Database config for development
const devConfig = {
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    host: process.env.PGHOST!,
    database: process.env.PGDATABASE!,
    port: Number(process.env.PGPORT!)
};

// Database config for production
const proConfig = {
    connectionString: process.env.DATABASE_URL!,
    ssl: {
        rejectUnauthorized: false
    }
};

// Create a new connection
const pool = new Pool(process.env.NODE_ENV! === 'production' ? proConfig : devConfig);

// Testing connection
pool.query('SELECT NOW()')
.then(() => console.log(chalk.cyan.underline(`Postgres connection established`)))
.catch(() => console.log(chalk.red.bold(`Postgres failed to connect`)))

export default pool;
