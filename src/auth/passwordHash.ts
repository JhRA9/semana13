// Utilidades para encriptar y verificar passwords de forma segura
// Usamos bcrypt para hash de passwords con salt

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Numero de rondas para generar el salt

// Encripta un password en texto plano
export async function hashPassword(plainPassword: string): Promise<string> {
  if (!plainPassword || plainPassword.length < 6) {
    throw new Error('El password debe tener al menos 6 caracteres');
  }

  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
}

// Verifica si un password coincide con su hash
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
}

// Ejemplo de uso:
// const hash = await hashPassword('miPassword123');
// const isValid = await verifyPassword('miPassword123', hash); // true
