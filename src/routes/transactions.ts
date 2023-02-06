import Express from 'express'
import { protect } from '../middleware/protect'
import { 
    getTransactions,
    createTransaction, 
    editTransaction, 
    deleteTransaction, 
    deleteTransactions
} from '../controllers/transactions'

const router = Express.Router()

router.get('/', protect, getTransactions)
router.post('/', protect, createTransaction)
router.patch('/:id', protect, editTransaction)
router.delete('/:id', protect, deleteTransaction)
router.delete('/', protect, deleteTransactions)

export default router;
