import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const carts = await cartDao.findCart();
        res.json({
            data: carts,
            message: "Carts list"
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartDao.findById(cid);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json({
            cart,
            message: "Cart found",
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message: "Error",
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const cart = await cartDao.createCart(req.body);
        res.json({
            cart,
            message: "Cart created"
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartDao.updateCart(cid, req.body);
        res.json({
            cart,
            message: "Cart updated"
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
});

router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartDao.deleteCart(cid);
        res.json({
            cart,
            message: "Cart deleted"
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            message: "Error"
        });
    }
});


//! tiene un /clear para que se diferencie del de arriba
router.delete("/:cid/clear", async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartDao.clearCart(cid);
        res.json({
            result,
            message: "Cart cleared"
        });
    } catch (error) {
        console.error(error);
        res.json({
            error,
            message: "Error"
        });
    }
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const result = await cartDao.deleteProductFromCart(cid, pid);
        res.json({
            result,
            message: "Product deleted from cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const result = await cartDao.setProductQuantity(cid, pid, quantity);
        res.json({
            result,
            message: "Product quantity updated"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const result = await cartDao.addProductCart(cid, pid);
        res.json({
            result,
            message: "Product added"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
