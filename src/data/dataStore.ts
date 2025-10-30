import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { Product, CartItem } from "../types/index.d.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, "data.json");

interface DataStore {
  products: Product[];
  carts: { [sessionId: string]: CartItem[] };
}

// Leer datos del archivo JSON
export async function readData(): Promise<DataStore> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error leyendo data.json:", error);
    // Si el archivo no existe, retornar estructura vacia
    return { products: [], carts: {} };
  }
}

// Escribir datos al archivo JSON
export async function writeData(data: DataStore): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error escribiendo data.json:", error);
    throw error;
  }
}

// Obtener todos los productos
export async function getProducts(): Promise<Product[]> {
  const data = await readData();
  return data.products;
}

// Obtener un producto por ID
export async function getProductById(id: number): Promise<Product | undefined> {
  const data = await readData();
  return data.products.find(p => p.id === id);
}

// Actualizar productos
export async function updateProducts(products: Product[]): Promise<void> {
  const data = await readData();
  data.products = products;
  await writeData(data);
}

// Obtener carrito por session ID
export async function getCart(sessionId: string): Promise<CartItem[]> {
  const data = await readData();
  return data.carts[sessionId] || [];
}

// Guardar carrito por session ID
export async function saveCart(sessionId: string, cart: CartItem[]): Promise<void> {
  const data = await readData();
  data.carts[sessionId] = cart;
  await writeData(data);
}

// Limpiar carrito por session ID
export async function clearCart(sessionId: string): Promise<void> {
  const data = await readData();
  delete data.carts[sessionId];
  await writeData(data);
}
