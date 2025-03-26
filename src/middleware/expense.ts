import type { Request, Response, NextFunction } from 'express'
import { body, param } from 'express-validator'
import { validationResult } from 'express-validator'
import Expense from '../models/Expense'

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}

export const validateExpenseInput = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await body('name')
        .notEmpty()
        .withMessage('El nombre del gasto no puede ir vacío.')
        .run(req)

    await body('amount')
        .notEmpty()
        .withMessage('El monto del gasto no puede ir vacío.')
        .isNumeric()
        .withMessage('Monto no válido.')
        .custom((value) => value > 0)
        .withMessage('El monto debe ser mayor a 0.')
        .run(req)

    next()
}

export const validateExpenseId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await param('expenseId')
        .isInt()
        .withMessage('El ID debe ser un número entero.')
        .custom((value) => value > 0)
        .withMessage('El ID no es válido.')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateExpenseExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)
        if (!expense) {
            const error = new Error('Gasto no encontrado.')
            res.status(404).send({ error: error.message })
            return
        }
        req.expense = expense

        next()
    } catch (error) {
        res
            .status(500)
            .send({ error: 'No se puedo completar la operación del gasto.' })
    }
}