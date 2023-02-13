import Express, {Request, Response} from 'express'
import errorHandler from './middleware/errorHandler'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

// Load environment variables
import * as dotenv from 'dotenv'
dotenv.config()

// Import routes
import coins from './routes/coins'
import auth from './routes/auth'
import portfolios from './routes/portfolios'
import transactions from './routes/transactions'

const app = Express()
const PORT = Number(process.env.PORT) || 5001

// Request body parser
app.use(Express.json())
// Cors
app.use(cors())
// Cookie parser
app.use(cookieParser())

// Route handlers
app.use('/api/v1/coins', coins)
app.use('/api/v1/auth', auth)
app.use('/api/v1/portfolios', portfolios)
app.use('/api/v1/transactions', transactions)

// Global error handler
app.use(errorHandler)

// Serve build files if in production mode
if (process.env.NODE_ENV === 'production') {
    app.use(Express.static(path.join(__dirname, '..client/dist')))
}

// Catch route
app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..client/dist/index.html'))
})

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})