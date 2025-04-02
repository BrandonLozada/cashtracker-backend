import { Router } from 'express'
import { BugetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import {
    hasAccess,
    validateBudgetExists,
    validateBudgetId,
    validateBudgetInput,
} from '../middleware/budget'
import { ExpensesController } from '../controllers/ExpenseController'
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from '../middleware/expense'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)
router.param('budgetId', hasAccess)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)

// Budgets routes
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

// Expenses routes
router.post(
    '/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create
)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put(
    '/:budgetId/expenses/:expenseId',
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById
)

router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router
