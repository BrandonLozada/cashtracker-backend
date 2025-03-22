import type { Request, Response, NextFunction } from 'express'
import { param } from 'express-validator'
import { validationResult } from 'express-validator'
import Budget from '../models/Budget'

declare global {
    namespace Express {
        interface Response {
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await param('id')
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
        const { id } = req.params
        const budget = await Budget.findByPk(id)
        if (!budget) {
            const error = new Error('Presupuesto no encontrado.')
            res.status(404).send({ error: error.message })
            return
        }
        res.budget = budget

        next()
    } catch (error) {
        res.status(500).send({ error: 'No se obtener el presupuesto.' })
    }
}
