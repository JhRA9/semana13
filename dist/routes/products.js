import { Router } from "express";
import { getProducts, getProductById } from "../data/dataStore.js";
const router = Router();
// Obtener todos los productos desde data.json
router.get("/", async (_req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});
// Obtener un producto por ID desde data.json
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await getProductById(id);
        if (!product)
            return res.status(404).json({ error: "Producto no encontrado" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
});
export default router;
