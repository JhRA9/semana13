// Middleware de autenticacion para validar sesiones activas
// Verifica que el usuario tenga una sesion valida antes de acceder a rutas protegidas

import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Verificamos que exista una sesion activa
  if (!req.session) {
    return res.status(401).json({ 
      error: 'No autorizado. Se requiere una sesion activa.' 
    });
  }

  // Verificamos que la sesion tenga datos validos
  const sess: any = req.session;
  if (!sess || Object.keys(sess).length === 0) {
    return res.status(401).json({ 
      error: 'Sesion invalida.' 
    });
  }

  // Si todo esta bien, continuamos
  next();
}

// Middleware opcional para verificar si el usuario esta autenticado
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sess: any = req.session;
  
  if (!sess.authenticated) {
    return res.status(403).json({ 
      error: 'Acceso denegado. Debe iniciar sesion.' 
    });
  }

  next();
}
