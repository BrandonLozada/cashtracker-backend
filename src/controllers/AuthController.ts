import type { Request, Response } from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { generateJWT } from '../utils/jwt'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const userExists = await User.findOne({ where: { email } })
        if (userExists) {
            const error = new Error('Ya existe una cuenta con ese correo electrónico.')
            res.status(409).send({ error: error.message })
            return
        }
        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()
            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })
            res.json('Cuenta creada correctamente.')
        } catch (error) {
            res.status(500).send({ error: 'No se pudo crear la cuenta.' })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body
        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error('Token no válido.')
            res.status(401).send({ error: error.message })
            return
        }
        user.confirmed = true
        user.token = null
        await user.save()
        res.json('Cuenta confirmada correctamente.')
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error('Usuario no encontrado.')
            res.status(404).send({ error: error.message })
            return
        }

        if (!user.confirmed) {
            const error = new Error('Cuenta no confirmada.')
            res.status(403).send({ error: error.message })
            return
        }

        const isPasswordMatched = await checkPassword(password, user.password)
        if(!isPasswordMatched) {
            const error = new Error('Contraseña incorrecta.')
            res.status(401).send({ error: error.message })
            return
        }

        const token = generateJWT(user.id)
        res.json(token)
    }
}
