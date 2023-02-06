import Express from 'express'
import { getCoin, getCoins, getCoinHistory } from '../controllers/coins'

const router = Express.Router()

router.get('/', getCoins)
router.get('/:id', getCoin)
router.get('/:id/:period', getCoinHistory)

export default router;
