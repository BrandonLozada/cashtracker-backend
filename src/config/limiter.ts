import { error } from 'console'
import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 5, // 5 peticiones * minuto
    message: { error: 'Has alcanzado el límite de peticiones. Inténtalo de nuevo en 5 minutos.' }
})