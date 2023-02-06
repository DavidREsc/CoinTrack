import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import hashPassword from "../utils/hashPassword";
import sendJwtResponse from "../utils/sendJwtResponse";
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'
import { RequestHandler, Request } from "express";
import db from '../db'

interface IBody {
    email: string;
    password: string;
}

interface AuthRequest extends Request {
    body: IBody
}

export const register: RequestHandler = asyncHandler(async (req: AuthRequest, res, next) => {
    const email = req.body.email
    const password = req.body.password

    // Check for body validation errors
    const validationError = validationResult(req)
    if (!validationError.isEmpty()) return next(new ErrorResponse(400, validationError.array()[0].msg))

    // Check for existing user
    const existingUser = await db.query('SELECT user_email FROM users WHERE user_email = $1', [email]);
    if (existingUser.rows.length) return next(new ErrorResponse(409, "Email is already in use by another account"))

    // Hash password and create a new user
    const hashedPassword = await hashPassword(password);

    const client = await db.connect()
    try {
        await client.query('BEGIN')
        const newUser = await client.query('INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING user_email, user_id', [email, hashedPassword]);
        await client.query('INSERT INTO portfolios (portfolio_name, user_id, main) VALUES ($1, $2, $3)',
            ['Main', newUser.rows[0].user_id, 't']
        )
        await client.query('COMMIT')
        client.release()
        sendJwtResponse(newUser.rows[0], 201, res)
    } catch (error) {
        await client.query('ROLLBACK')
        client.release()
        next(error)
    }
})

export const login: RequestHandler = asyncHandler(async (req: AuthRequest, res, next) => {
    const email = req.body.email
    const password = req.body.password

    // Check for body validation errors
    const validationError = validationResult(req)
    if (!validationError.isEmpty()) return next(new ErrorResponse(400, validationError.array()[0].msg))

    // Retrieve user
    const user = await db.query('SELECT user_email, user_password, user_id FROM users WHERE user_email = $1', [email])
    if (!user.rows.length) return next(new ErrorResponse(400, 'Incorrect email or password'))

    // Verify password is correct
    const verifiedPassword = await bcrypt.compare(password, user.rows[0].user_password)
    if (!verifiedPassword) return next(new ErrorResponse(400, 'Incorrect email or password'))

    // Create a jwt token and send a response
    const {user_email, user_id} = user.rows[0]
    sendJwtResponse({user_email, user_id}, 200, res)
})

export const logout: RequestHandler = asyncHandler(async (req, res, next) => {
    const token: string = req.cookies.CTtoken
    // Blacklist the token
    const blackListedToken = await db.query('INSERT INTO jwt_blacklist (jwt) VALUES ($1) RETURNING *', [token])
    if (!blackListedToken.rows.length) return next(new ErrorResponse(500, 'Logout failed'))

    // Remove cookie from client
    res.cookie('CTtoken', 'none', {
        expires: new Date(1),
        httpOnly: true
    })
    res.status(200).send()
})

export const demoLogin: RequestHandler = asyncHandler(async (req, res, next) => {
    const email = 'davidrapalae@gmail.com'
    const password = 'admin123*!@#$%^$$#@'

    // Retrieve user
    const user = await db.query('SELECT user_email, user_password, user_id FROM users WHERE user_email = $1', [email])
    if (!user.rows.length) return next(new ErrorResponse(400, 'Incorrect email or password'))

    // Verify password is correct
    const verifiedPassword = await bcrypt.compare(password, user.rows[0].user_password)
    if (!verifiedPassword) return next(new ErrorResponse(400, 'Incorrect email or password'))

    // Create a jwt token and send a response
    const {user_email, user_id} = user.rows[0]
    sendJwtResponse({user_email, user_id}, 200, res)
})