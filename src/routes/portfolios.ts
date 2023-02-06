import Express from 'express'
import { getPortfolios, createPortfolio, deletePortfolio } from '../controllers/portfolios'
import { protect } from '../middleware/protect'

const router = Express.Router()

router.get('/', protect, getPortfolios)
router.post('/', protect, createPortfolio)
router.delete('/:id', protect, deletePortfolio)

export default router;
