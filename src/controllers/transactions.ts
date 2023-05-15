import { RequestHandler, Request } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { calculateMetrics } from "../utils/transactionCalculations";
import db from '../db'
import { QueryResult } from "pg";
import { ITransactionWithIdData } from "../types";
import ErrorResponse from "../utils/errorResponse";

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
    portfolios?: IPortfolioData[]
}
interface ITransactionsRequest extends Request {
    body: IBody
}
interface ITransactionsData {
    transaction_id: number;
    portfolio_id: number;
    transaction_type: string;
    coin_id: string;
    coin_price: string;
    coin_amount: string;
    transaction_date: Date
}
interface IPortfolioData {
    portfolio_name: string;
    portfolio_id: number;
    main: boolean;
}
interface ITransactionsQuery extends QueryResult {
    rows: ITransactionsData[]
}
interface ITransactionsWithIdQuery extends QueryResult {
    rows: ITransactionWithIdData[]
}

export const getTransactions: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    interface IData {
        buyTransactions: ITransactionsData[];
        sellTransactions: ITransactionsData[];
        portfolios: IPortfolioData[]
    }

    const {user_id} = req.body.user
    const buyTransactions: ITransactionsQuery = await db.query('SELECT transaction_id, transactions.portfolio_id, transaction_type, coin_id, coin_price, coin_amount, transaction_date ' +
        'FROM users JOIN portfolios ON portfolios.user_id = users.user_id ' +
        'JOIN transactions ON transactions.portfolio_id = portfolios.portfolio_id ' +
        'WHERE users.user_id = $1 and transaction_type = $2 ORDER BY transaction_date', [user_id, 'buy']
    )
    const sellTransactions: ITransactionsQuery = await db.query('SELECT transaction_id, transactions.portfolio_id, transaction_type, coin_id, coin_price, coin_amount, transaction_date ' +
        'FROM users JOIN portfolios ON portfolios.user_id = users.user_id ' +
        'JOIN transactions ON transactions.portfolio_id = portfolios.portfolio_id ' +
        'WHERE users.user_id = $1 and transaction_type = $2 ORDER BY transaction_date', [user_id, 'sell']
    )
    const data: IData = {
        buyTransactions: buyTransactions.rows,
        sellTransactions: sellTransactions.rows,
        portfolios: req.body.portfolios || []
    }

    res.status(200).json({
        success: true,
        data
    })
})

export const getTransactionsWithId: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {coin_id, portfolio_id} = req.params;
    const {user_id} = req.body.user;
    const transactionsQuery: ITransactionsWithIdQuery = await db.query('SELECT transaction_type, transaction_date, coin_price, coin_amount ' + 
        'FROM users JOIN portfolios ON portfolios.user_id = users.user_id ' +
        'JOIN transactions ON transactions.portfolio_id = portfolios.portfolio_id ' +
        'WHERE users.user_id = $1 and portfolios.portfolio_id = $2 and transactions.coin_id= $3', [user_id, portfolio_id, coin_id]);
    if (!transactionsQuery.rows.length) return next(new ErrorResponse(400, "No transactions found"));
    const metrics = calculateMetrics(transactionsQuery.rows)
    res.status(200).json({
        success: true,
        data: {
            metrics,
            transactions: transactionsQuery.rows
        }
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
        data: transaction.rows[0]
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
        data: transaction.rows[0]
    })
})

export const deleteTransaction: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {id} = req.params
    await db.query('DELETE FROM transactions WHERE transaction_id = $1', [id])

    res.status(200).json({
        success: true,
        data: {}
    })
})

export const deleteTransactions: RequestHandler = asyncHandler(async (req: ITransactionsRequest, res, next) => {
    const {portfolio_id, coin_id} = req.body
    await db.query('DELETE FROM transactions WHERE portfolio_id = $1 AND coin_id = $2', [portfolio_id, coin_id])

    res.status(200).json({
        sucess: true,
        data: {}
    })
})
