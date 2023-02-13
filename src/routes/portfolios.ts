import Express from 'express'
import { getPortfolios, createPortfolio, deletePortfolio } from '../controllers/portfolios'
import { getTransactions } from '../controllers/transactions'
import { protect } from '../middleware/protect'

const router = Express.Router()

router.get('/', protect, getPortfolios, getTransactions)
router.post('/', protect, createPortfolio)
router.delete('/:id', protect, deletePortfolio)

export default router;
