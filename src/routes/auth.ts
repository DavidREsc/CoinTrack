import Express, {Request, Response} from 'express'
import { register, login, logout, demoLogin } from '../controllers/auth'
import { protect } from '../middleware/protect'
import {body} from 'express-validator'

const router = Express.Router()

router.post('/register', 
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
        .trim()
        .escape(),
    register
)
router.post('/login',
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .trim()
        .escape(),
    login
)
router.post('/logout', logout)
router.post('/demoLogin', demoLogin)
router.get('/verify', protect, (req: Request, res: Response) => {
    res.status(200).send()
})

export default router;
