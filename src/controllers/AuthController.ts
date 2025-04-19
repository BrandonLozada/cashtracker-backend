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
            const error = new Error(
                'Ya existe una cuenta con ese correo electrónico.'
            )
            res.status(409).json({ error: error.message })
            return
        }
        try {
            const user = await User.create(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()
            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token,
            })
            res.status(201).json('Cuenta creada correctamente.')
        } catch (error) {
            res.status(500).json({ error: 'No se pudo crear la cuenta.' })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body
        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error('Token no válido.')
            res.status(401).json({ error: error.message })
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
            res.status(404).json({ error: error.message })
            return
        }

        if (!user.confirmed) {
            const error = new Error('Cuenta no confirmada.')
            res.status(403).json({ error: error.message })
            return
        }

        const isPasswordMatched = await checkPassword(password, user.password)
        if (!isPasswordMatched) {
            const error = new Error('Contraseña incorrecta.')
            res.status(401).json({ error: error.message })
            return
        }

        const token = generateJWT(user.id)
        res.json(token)
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error('Usuario no encontrado.')
            res.status(404).json({ error: error.message })
            return
        }
        user.token = generateToken()
        await user.save()

        await AuthEmail.sendResetTokenEmail({
            name: user.name,
            email: user.email,
            token: user.token,
        })

        res.json('Revisa tu correo electrónico para seguir las instrucciones.')
    }

    static validateToken = async (req: Request, res: Response) => {
        const { token } = req.body

        const tokenExists = await User.findOne({ where: { token } })
        if (!tokenExists) {
            const error = new Error('Token no válido.')
            res.status(404).json({ error: error.message })
            return
        }

        res.json('Token válido.')
    }

    static resetPasswordWithToken = async (req: Request, res: Response) => {
        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error('Token no válido.')
            res.status(404).json({ error: error.message })
            return
        }

        user.password = await hashPassword(password)
        user.token = null
        await user.save()

        res.json('Contraseña restablecida correctamente.')
    }

    static user = async (req: Request, res: Response) => {
        res.json(req.user)
    }

    static updateCurrentUserPassword = async (req: Request, res: Response) => {
        const { currentPassword, password } = req.body
        const { id } = req.user

        const user = await User.findByPk(id)

        const isPasswordMatched = await checkPassword(
            currentPassword,
            user.password
        )
        if (!isPasswordMatched) {
            const error = new Error('La contraseña actual es incorrecta.')
            res.status(401).json({ error: error.message })
            return
        }

        user.password = await hashPassword(password)
        await user.save()
        res.json('Contraseña actualizada correctamente.')
    }

    static checkPassword = async (req: Request, res: Response) => {
        const { password } = req.body
        const { id } = req.user

        const user = await User.findByPk(id)

        const isPasswordMatched = await checkPassword(password, user.password)
        if (!isPasswordMatched) {
            const error = new Error('Contraseña incorrecta.')
            res.status(401).json({ error: error.message })
            return
        }

        res.json('Contraseña correcta.')
    }
}
