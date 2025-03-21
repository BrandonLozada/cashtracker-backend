import { Router } from 'express'
import { body, param } from 'express-validator'
import { BugetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'

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
    param('id')
        .isInt()
        .withMessage('El ID debe ser un número entero.')
        .custom((value) => value > 0)
        .withMessage('El ID no es válido.'),
    handleInputErrors,
    BugetController.getById
)

router.put(
    '/:id',
    param('id')
        .isInt()
        .withMessage('El ID debe ser un número entero.')
        .custom((value) => value > 0)
        .withMessage('El ID no es válido.'),
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
    param('id')
        .isInt()
        .withMessage('El ID debe ser un número entero.')
        .custom((value) => value > 0)
        .withMessage('El ID no es válido.'),
    handleInputErrors,
    BugetController.deleteById
)

export default router
