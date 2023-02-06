import { RequestHandler, Request } from "express";
import asyncHandler from "../middleware/asyncHandler";
import db from '../db'

interface IBody {
    user: {
        user_id: string;
        user_email: string;
    };
    portfolio_id: number;
    coin_id: string;
    coin_amount: number;
    coin_price: number;
    transaction_type: string;
    transaction_date: Date;
}

interface ITransactionsRequest extends Request {
    body: IBody
}

export const getTransactions: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {user_id} = req.body.user
    const transactions = await db.query('SELECT transaction_id, transactions.portfolio_id, transaction_type, coin_id, coin_price, coin_amount, transaction_date ' +
        'FROM users JOIN portfolios ON portfolios.user_id = users.user_id ' +
        'JOIN transactions ON transactions.portfolio_id = portfolios.portfolio_id ' +
        'WHERE users.user_id = $1 ORDER BY transaction_date', [user_id]
    )

    res.status(200).json({
        success: true,
        data: transactions.rows
    })
})

export const createTransaction: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {portfolio_id, coin_id, coin_amount, coin_price, transaction_date, transaction_type} = req.body
    const transaction = await db.query('INSERT INTO transactions (portfolio_id, coin_id, coin_amount, coin_price, transaction_date, transaction_type) ' +
        'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [portfolio_id, coin_id, coin_amount, coin_price, transaction_date, transaction_type]
    )
    
    res.status(201).json({
        success: true,
        data: transaction.rows
    })
})

export const editTransaction: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {coin_amount, coin_price, transaction_date, transaction_type} = req.body
    const {id} = req.params
    const transaction = await db.query('UPDATE transactions SET (coin_amount, coin_price, transaction_date, transaction_type) ' +
        '= ($1, $2, $3, $4) WHERE transaction_id = $5 RETURNING *', 
        [coin_amount, coin_price, transaction_date, transaction_type, id]
    )
    
    res.status(200).json({
        success: true,
        data: transaction.rows
    })
})

export const deleteTransaction: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {id} = req.params
    await db.query('DELETE FROM transactions WHERE transaction_id = $1', [id])

    res.status(200).json({
        success: true,
        data: []
    })
})

export const deleteTransactions: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {portfolio_id, coin_id} = req.body
    await db.query('DELETE FROM transactions WHERE portfolio_id = $1 AND coin_id = $2', [portfolio_id, coin_id])

    res.status(200).json({
        sucess: true,
        data: []
    })
})
