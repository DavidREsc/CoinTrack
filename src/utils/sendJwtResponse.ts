import { Response } from 'express';
import createJwt from './createJwt';

interface IUser {
    user_id: string;
    user_email: string;
}

// Creates jwt token, stores in cookie, and sends back a response
const sendJwtResponse = (user: IUser, statusCode: number, res: Response) => {
    const CTtoken = createJwt(user)
    const cookieOptions = {
        expires: new Date(Date.now() + (5 * 60 * 60 * 1000)),
        httpOnly: true,
        secure: false
    }
    return res.status(statusCode)
        .cookie('CTtoken', CTtoken, cookieOptions)
        .json({
            success: true,
            user: user.user_email
        })
}

export default sendJwtResponse;
