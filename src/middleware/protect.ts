import asyncHandler from "./asyncHandler"
import ErrorResponse from "../utils/errorResponse"
import jwt from 'jsonwebtoken'
import { RequestHandler } from "express"
import db from '../db'

// Verifies jwt token
export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
    const token: string | undefined = req.cookies.CTtoken
    if (!token) return next(new ErrorResponse(200, 'Not authorized to access this route'))
    const blackListedToken = await db.query('SELECT * FROM jwt_blacklist WHERE jwt = $1', [token])
    if (blackListedToken.rows.length) return next(new ErrorResponse(401, 'Not authorized to access this route'))

    const secret = process.env.JWTSECRET!
    const payload = jwt.verify(token, secret)
    req.body.user = payload
    next()
})