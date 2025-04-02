import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { AuthController } from '../controllers/AuthController'
import { limiter } from '../config/limiter'
import { authenticate } from '../middleware/auth'

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
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('El token no es válido.'),
    handleInputErrors,
    AuthController.validateToken
)

router.post(
    '/reset-password/:token',
    param('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('El token no es válido.'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres.'),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

router.get('/user', authenticate, AuthController.user)

router.post(
    '/update-password',
    authenticate,
    body('currentPassword')
        .notEmpty()
        .withMessage('La contraseña actual no puede ir vacía.'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña nueva es muy corta, minimo debe tener 8 caracteres.'),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

export default router
