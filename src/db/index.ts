import {Pool} from 'pg'

const devConfig = {
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    host: process.env.PGHOST!,
    database: process.env.PGDATABASE!,
    port: parseInt(process.env.PGPORT!)
};

const proConfig = {
    connectionString: process.env.DATABASE_URL!,
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool(process.env.NODE_ENV! === 'production' ? proConfig : devConfig);

export default pool;
