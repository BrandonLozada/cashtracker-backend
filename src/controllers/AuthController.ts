import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body

        // Para evitar que se creen cuentas duplicadas
        const userExists = await User.findOne({ where: { email } })
        if (userExists) {
            const error = new Error('Ya existe una cuenta con ese correo electrónico.')
            res.status(409).send({ error: error.message })
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
}
