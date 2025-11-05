// Validacion y sanitizacion de inputs del usuario
// Previene inyecciones y datos maliciosos

// Sanitiza un string removiendo caracteres peligrosos
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Removemos tags HTML y scripts
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Removemos caracteres especiales peligrosos
  sanitized = sanitized.replace(/[<>\"\']/g, '');
  
  // Limitamos la longitud
  sanitized = sanitized.slice(0, 500);
  
  return sanitized.trim();
}

// Valida que un numero este en un rango valido
export function validateNumber(value: any, min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number | null {
  const num = Number(value);
  
  if (isNaN(num)) return null;
  if (num < min || num > max) return null;
  
  return num;
}

// Valida un productId
export function validateProductId(productId: any): number | null {
  return validateNumber(productId, 1, 10000);
}

// Valida una cantidad (qty)
export function validateQuantity(qty: any): number | null {
  return validateNumber(qty, 1, 100);
}

// Valida un email
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Valida un password
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!password || typeof password !== 'string') {
    errors.push('Password requerido');
    return { valid: false, errors };
  }
  
  if (password.length < 6) {
    errors.push('Password debe tener al menos 6 caracteres');
  }
  
  if (password.length > 100) {
    errors.push('Password demasiado largo');
  }
  
  return { valid: errors.length === 0, errors };
}
