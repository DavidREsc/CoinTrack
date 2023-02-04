import express from 'express'
import db from './db'

const app = express();

app.get('/', async (req, res) => {
    try {
        const {rows} = await db.query('SELECT * FROM users');
        console.log(rows)
        res.send('wtf')
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
    
})

app.listen(5000, () => {
    console.log(`Listening on port 5000`);
})