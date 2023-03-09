import asyncHandler from "../middleware/asyncHandler";
import db from '../db'
import { RequestHandler, Request } from "express";

interface IPortfolioData {
    portfolio_name: string;
    portfolio_id: number;
    main: boolean;
}

interface IBody {
    user: {
        user_id: string;
        user_email: string;
    },
    portfolio_name: string;
    portfolios: IPortfolioData[]
}

interface IPortfolioRequest extends Request {
    body: IBody
}

export const getPortfolios: RequestHandler = asyncHandler(async (req: IPortfolioRequest, res, next) => {
    const {user_id} = req.body.user
    const portfolios = await db.query('SELECT portfolio_name, portfolio_id, main FROM portfolios WHERE user_id = $1', [user_id])
    req.body.portfolios = portfolios.rows
    next()
})

export const createPortfolio: RequestHandler = asyncHandler(async (req: IPortfolioRequest, res, next) => {
    const {user_id} = req.body.user
    const portfolio_name = req.body.portfolio_name
    const portfolio = await db.query('INSERT INTO portfolios (portfolio_name, user_id) VALUES ($1, $2) RETURNING portfolio_id, portfolio_name, main', [portfolio_name, user_id])

    res.status(201).json({
        success: true,
        data: portfolio.rows[0]
    })
})

export const deletePortfolio: RequestHandler = asyncHandler(async(req: IPortfolioRequest, res, next) => {
    const {id} = req.params
    const client = await db.connect()
    try {
        await client.query('BEGIN')
        await client.query('DELETE FROM transactions WHERE portfolio_id = $1', [id])
        await client.query('DELETE FROM portfolios WHERE portfolio_id = $1', [id])
        await client.query('COMMIT')
        client.release()
        res.status(200).json({
            success: true,
            data: []
        })
    } catch (error) {
        await client.query('ROLLBACK')
        client.release()
        next(error)
    }
})