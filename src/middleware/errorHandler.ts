import { ErrorRequestHandler } from "express";
import chalk from 'chalk'
import ErrorResponse from "../utils/errorResponse";

// Error handling middleware
const errorHandler: ErrorRequestHandler = (e, req, res, next) => {
    console.log(chalk.red(e, e.statusCode))
    res.status(e.statusCode || 500).json({
        success: false,
        error: e.message
    })
}

export default errorHandler;
