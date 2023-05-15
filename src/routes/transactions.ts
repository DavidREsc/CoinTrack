import Express from 'express'
import { protect } from '../middleware/protect'
import { 
    getTransactions,
    createTransaction, 
    editTransaction, 
    deleteTransaction, 
    deleteTransactions,
    getTransactionsWithId
} from '../controllers/transactions'

const router = Express.Router()

router.get('/', protect, getTransactions)
router.get('/:coin_id/:portfolio_id', protect, getTransactionsWithId)
router.post('/', protect, createTransaction)
router.patch('/:id', protect, editTransaction)
router.delete('/:id', protect, deleteTransaction)
router.delete('/', protect, deleteTransactions)

export default router;
