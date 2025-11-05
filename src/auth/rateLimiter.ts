// Rate Limiter para limitar peticiones por IP y prevenir ataques de fuerza bruta
// Limita el numero de requests que un cliente puede hacer en un periodo de tiempo

import rateLimit from 'express-rate-limit';

// Limiter general para todas las rutas API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Maximo 100 peticiones por ventana
  message: {
    error: 'Demasiadas peticiones desde esta IP. Intenta de nuevo mas tarde.'
  },
  standardHeaders: true, // Retorna info de rate limit en headers
  legacyHeaders: false,
});

// Limiter estricto para rutas de autenticacion (login, registro)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Maximo 5 intentos
  message: {
    error: 'Demasiados intentos de autenticacion. Intenta de nuevo en 15 minutos.'
  },
  skipSuccessfulRequests: true, // No cuenta requests exitosos
});

// Limiter para carrito (mas permisivo)
export const cartLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // 30 peticiones por minuto
  message: {
    error: 'Demasiadas operaciones en el carrito. Espera un momento.'
  },
});
