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
        try {
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if (!budget) {
                const error = new Error('Presupuesto no encontrado.')
                res.status(404).send({ error: error.message })
                return
            }
            res.json(budget)
        } catch (error) {
            res.status(500).send({ error: 'No se obtener el presupuesto.' })
        }
    }

    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if (!budget) {
                const error = new Error('Presupuesto no encontrado.')
                res.status(404).send({ error: error.message })
                return
            }
            await budget.update(req.body)
            res.json('Presupuesto actualizado correctamente.')
        } catch (error) {
            res.status(500).send({ error: 'No se actualizar el presupuesto.' })
        }
    }

    static async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if (!budget) {
                const error = new Error('Presupuesto no encontrado.')
                res.status(404).send({ error: error.message })
                return
            }
            await budget.destroy()
            res.json('Presupuesto eliminado correctamente.')
        } catch (error) {
            res.status(500).send({ error: 'No se eliminar el presupuesto.' })
        }
    }
}
