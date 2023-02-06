import jwt from 'jsonwebtoken'

interface IUser {
    user_id: string,
    user_email: string
}

// Sign and return a new JWT token
const createJwt = (user: IUser) => {
    const secret = process.env.JWTSECRET!;
    return jwt.sign(user, secret, {
        expiresIn: '5h'
    })
}

export default createJwt;
