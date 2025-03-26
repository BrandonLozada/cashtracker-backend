import type { Request, Response } from 'express'
import Budget from '../models/Budget'

export class BugetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [['createdAt', 'DESC']],
                // TODO: Filtrar por usuario
            })
            res.json(budgets)
        } catch (error) {
            res.status(500).send({ error: 'No se puedo obtener los presupuestos.' })
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Presupuesto creado correctamente.')
        } catch (error) {
            res.status(500).send({ error: 'No se pudo crear el presupuesto.' })
        }
    }

    static getById = async (req: Request, res: Response) => {
        res.json(req.budget)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente.')
    }

    static async deleteById(req: Request, res: Response) {
        await req.budget.destroy()
        res.json('Presupuesto eliminado correctamente.')
    }
}
