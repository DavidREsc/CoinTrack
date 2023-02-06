import { Request, Response, NextFunction, RequestHandler} from "express";

// Call with controller function as parameter
// Catches errors without the need for a try-catch block and calls next
const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler;
