import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { AuthController } from '../controllers/AuthController'
import { limiter } from '../config/limiter'

const router = Router()

router.use(limiter)

router.post(
    '/create-account',
    body('name').notEmpty().withMessage('El nombre no puede ir vacío.'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('email').isEmail().withMessage('El correo electrónico no es válido.'),
    handleInputErrors,
    AuthController.createAccount
)

router.post(
    '/confirm-account',
    body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('El token no válido.'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post(
    '/login',
    body('email').isEmail().withMessage('El correo electrónico no es válido.'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacía.'),
    handleInputErrors,
    AuthController.login
)

router.post(
    '/forgot-password',
    body('email').isEmail().withMessage('El correo electrónico no es válido.'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post(
    '/validate-token',
    body('token')
        .isLength({ min: 6, max: 6 })
        .withMessage('El token no es válido.'),
    handleInputErrors,
    AuthController.validateToken
)

export default router
