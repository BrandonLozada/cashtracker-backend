import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No autorizado.')
        res.status(401).send({ error: error.message })
        return
    }

    const [authType, token] = bearer.split(' ')
    if (authType !== 'Bearer') {
        const error = new Error('Tipo de autenticación no permitido.')
        res.status(401).send({ error: error.message })
        return
    }

    if (!token) {
        const error = new Error('Token no válido.')
        res.status(401).send({ error: error.message })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email'],
            })
            req.user = user
            next()
        }
    } catch (error) {
        res
            .status(500)
            .send({ error: 'Token no válido.' })
    }
}
