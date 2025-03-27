import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { AuthController } from '../controllers/AuthController'

const router = Router()

router.post('/create-account',
    body('name')
    .notEmpty()
    .withMessage('El nombre no puede ir vacío.'),
    body('password').isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('email').isEmail()
    .withMessage('El correo electrónico no es válido.'),
    handleInputErrors,
    AuthController.createAccount)

export default router