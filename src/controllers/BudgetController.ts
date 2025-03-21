import type { Request, Response } from 'express'
import Budget from '../models/Budget'

export class BugetController {
    static async getAll(req: Request, res: Response) {
        res.send('Desde /api/budgets')
    }

    static async create(req: Request, res: Response) {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Presupuesto creado correctamente')
        } catch (error) {
            res.status(500).send({ error: 'Error al crear el presupuesto' })
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params
        res.send(`Desde GET /api/budgets/${id}`)
    }

    static async updateById(req: Request, res: Response) {
        const { id } = req.params
        res.send(`Desde PUT /api/budgets/${id}`)
    }

    static async deleteById(req: Request, res: Response) {
        const { id } = req.params
        res.send(`Desde DELETE /api/budgets/${id}`)
    }
}