import { Router } from "express";
import type { CartItem } from "../types/index.d.js";
import { getCart, saveCart, clearCart } from "../data/dataStore.js";

const router = Router();

// Funcion auxiliar para obtener el session ID
function getSessionId(req: any): string {
  return req.sessionID || req.session?.id || "default-session";
}

// Obtener carrito desde data.json
router.get("/", async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await getCart(sessionId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

// Agregar producto al carrito y guardarlo en data.json
router.post("/add", async (req, res) => {
  try {
    const { productId, qty } = req.body as CartItem;
    if (!productId || qty == null || qty <= 0) {
      return res.status(400).json({ error: "Datos invalidos" });
    }

    const sessionId = getSessionId(req);
    let cart = await getCart(sessionId);
    
    const idx = cart.findIndex((i: CartItem) => i.productId === productId);
    if (idx >= 0) {
      cart[idx].qty += qty;
    } else {
      cart.push({ productId, qty });
    }

    await saveCart(sessionId, cart);
    res.json({ ok: true, cart });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

// Eliminar producto del carrito y actualizar data.json
router.post("/remove", async (req, res) => {
  try {
    const { productId } = req.body as { productId: number };
    if (!productId) return res.status(400).json({ error: "productId requerido" });

    const sessionId = getSessionId(req);
    let cart = await getCart(sessionId);
    cart = cart.filter((i: CartItem) => i.productId !== productId);

    await saveCart(sessionId, cart);
    res.json({ ok: true, cart });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto del carrito" });
  }
});

// Limpiar carrito y actualizar data.json
router.post("/clear", async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    await clearCart(sessionId);
    res.json({ ok: true, cart: [] });
  } catch (error) {
    res.status(500).json({ error: "Error al limpiar carrito" });
  }
});

export default router;
