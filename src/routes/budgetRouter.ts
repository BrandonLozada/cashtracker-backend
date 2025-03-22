import { Router } from 'express'
import { body, param } from 'express-validator'
import { BugetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId } from '../middleware/budget'

const router = Router()

router.get('/', BugetController.getAll)

router.post(
    '/',
    body('name')
        .notEmpty()
        .withMessage('El nombre del presupuesto no puede ir vacío.'),
    body('amount')
        .notEmpty()
        .withMessage('El monto del presupuesto no puede ir vacío.')
        .isNumeric()
        .withMessage('Monto no válido.')
        .custom((value) => value > 0)
        .withMessage('El monto debe ser mayor a 0.'),
    handleInputErrors,
    BugetController.create
)

router.get(
    '/:id',
    validateBudgetId,
    validateBudgetExists,
    BugetController.getById
)

router.put(
    '/:id',
    validateBudgetId,
    body('name')
        .notEmpty()
        .withMessage('El nombre del presupuesto no puede ir vacío.'),
    body('amount')
        .notEmpty()
        .withMessage('El monto del presupuesto no puede ir vacío.')
        .isNumeric()
        .withMessage('Monto no válido.')
        .custom((value) => value > 0)
        .withMessage('El monto debe ser mayor a 0.'),
    handleInputErrors,
    BugetController.updateById
)

router.delete(
    '/:id',
    validateBudgetId,
    BugetController.deleteById
)

export default router
