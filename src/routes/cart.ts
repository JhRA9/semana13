import { Router } from "express";
import type { CartItem } from "../types/index.d.js";
import { products } from "./products.js";

const router = Router();

//Ver contenido del carrito
router.get("/", (req, res) => {
  const cart: CartItem[] = (req.session as any).cart || [];
  res.json(cart);
});

//Calcular total del carrito
router.get("/total", (req, res) => {
  const cart: CartItem[] = (req.session as any).cart || [];

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  res.json({ total });
});

//Agregar producto al carrito (con validaciones)
router.post("/add", (req, res) => {
  const { productId, qty } = req.body as CartItem;

  if (productId == null || isNaN(productId)) {
    return res.status(400).json({ error: "productId inválido" });
  }

  if (!qty || qty <= 0) {
    return res.status(400).json({ error: "La cantidad debe ser mayor a 0" });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(400).json({ error: "El producto no existe" });
  }

  const sess: any = req.session;
  sess.cart = sess.cart || [];

  const idx = sess.cart.findIndex((i: CartItem) => i.productId === productId);

  if (idx >= 0) {
    sess.cart[idx].qty += qty;
  } else {
    sess.cart.push({ productId, qty });
  }

  res.json({ ok: true, cart: sess.cart });
});

//Quitar un producto del carrito (con validación)
router.post("/remove", (req, res) => {
  const { productId } = req.body as { productId: number };

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ error: "productId inválido" });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(400).json({ error: "El producto no existe" });
  }

  const sess: any = req.session;
  sess.cart = (sess.cart || []).filter(
    (i: CartItem) => i.productId !== productId
  );

  res.json({ ok: true, cart: sess.cart });
});

//Vaciar todo el carrito
router.post("/clear", (req, res) => {
  (req.session as any).cart = [];
  res.json({ ok: true, cart: [] });
});

export default router;
