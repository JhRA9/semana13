import { Router } from "express";
import type { Product } from "../types/index.d.js";

export const products: Product[] = [
  { id: 1, name: "Runner Azul", price: 199999, image: "/img/shoe_1.png", description: "Zapatilla ligera para correr, malla transpirable.", stock: 12 },
  { id: 2, name: "Classic Rojo", price: 149999, image: "/img/shoe_2.png", description: "Clásico urbano para uso diario.", stock: 24 },
  { id: 3, name: "Eco Verde", price: 179999, image: "/img/shoe_3.png", description: "Materiales reciclados, cómodo y resistente.", stock: 8 },
  { id: 4, name: "Urban Naranja", price: 159999, image: "/img/shoe_4.png", description: "Estilo urbano con suela de alta tracción.", stock: 16 },
  { id: 5, name: "Sport Morado", price: 189999, image: "/img/shoe_5.png", description: "Para entrenamientos de alto rendimiento.", stock: 10 },
  { id: 6, name: "Trail Gris", price: 209999, image: "/img/shoe_6.png", description: "Ideal para montaña y terrenos irregulares.", stock: 7 },
  { id: 7, name: "Mocasines Negros", price: 200000, image: "/img/shoe_7.png", description: "Zapatos cómodos y sin cordones, con un estilo clásico y versátil.", stock: 24 },
  { id: 8, name: "Botines gamuza", price: 150000, image: "/img/shoe_8.png", description: "Zapatos tipo bota que cubren hasta el tobillo, combinan comodidad y estilo.", stock: 15 },
  { id: 9, name: "Tacones azul rey", price: 300999, image: "/img/shoe_9.png", description: "Calzado femenino con elevación en el talón que estiliza la figura y aporta elegancia.", stock: 25 },
];

const router = Router();

// Rutas
router.get("/", (_req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

export default router;
