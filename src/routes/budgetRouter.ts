import { Router } from 'express'
import { body } from 'express-validator'
import { BugetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import {
    validateBudgetExists,
    validateBudgetId,
    validateBudgetInput,
} from '../middleware/budget'

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.get('/', BugetController.getAll)

router.post('/', validateBudgetInput, handleInputErrors, BugetController.create)

router.get('/:budgetId', BugetController.getById)

router.put(
    '/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BugetController.updateById
)

router.delete('/:budgetId', BugetController.deleteById)

export default router
