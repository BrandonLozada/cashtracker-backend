import type { Request, Response, NextFunction } from 'express'
import { body, param } from 'express-validator'
import { validationResult } from 'express-validator'
import Budget from '../models/Budget'

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await param('budgetId')
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

export const validateBudgetExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            const error = new Error('Presupuesto no encontrado.')
            res.status(404).json({ error: error.message })
            return
        }
        req.budget = budget

        next()
    } catch (error) {
        res
            .status(500)
            .json({ error: 'No se puedo completar la operación del presupuesto.' })
    }
}

export const validateBudgetInput = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await body('name')
        .notEmpty()
        .withMessage('El nombre del presupuesto no puede ir vacío.')
        .run(req)

    await body('amount')
        .notEmpty()
        .withMessage('El monto del presupuesto no puede ir vacío.')
        .isNumeric()
        .withMessage('Monto no válido.')
        .custom((value) => value > 0)
        .withMessage('El monto debe ser mayor a 0.')
        .run(req)

    next()
}

export function hasAccess(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(req.budget.userId !== req.user.id) {
        const error = new Error("Acción no válida.")
        res.status(401).json({ error: error.message })
        return
    }
    next()
}
