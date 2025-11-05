// Configuracion de variables de entorno
// Carga variables sensibles desde archivo .env para mayor seguridad

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargamos las variables de entorno
dotenv.config({ path: join(__dirname, '../../.env') });

// Interface para las variables de entorno
interface EnvConfig {
  PORT: number;
  SESSION_SECRET: string;
  NODE_ENV: string;
  COOKIE_MAX_AGE: number;
}

// Obtenemos las variables de entorno con valores por defecto
export const config: EnvConfig = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret-default-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development',
  COOKIE_MAX_AGE: parseInt(process.env.COOKIE_MAX_AGE || '86400000', 10), // 24 horas
};

// Validamos que las variables criticas esten configuradas
export function validateEnvConfig(): void {
  if (config.NODE_ENV === 'production' && config.SESSION_SECRET === 'secret-default-change-in-production') {
    console.warn('⚠️  ADVERTENCIA: Usando SESSION_SECRET por defecto en produccion. Configura una clave segura en .env');
  }
  
  if (!config.PORT || config.PORT < 1 || config.PORT > 65535) {
    throw new Error('PORT debe ser un numero valido entre 1 y 65535');
  }
  
  console.log(`✅ Configuracion cargada: ${config.NODE_ENV} en puerto ${config.PORT}`);
}
