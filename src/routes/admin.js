import { Router } from "express";

import isAdmin from "../middleware/isAdmin.js";

import {
    dashboard,
    products,
    newProduct,
    createProduct,
    editProduct,
    updateProduct,
    deleteProduct,
    orders,
} from "../controllers/adminController.js";

const router = Router();

router.get("/", isAdmin, dashboard);

router.get("/products", isAdmin, products);

router.get("/products/new", isAdmin, newProduct);

router.post("/products", isAdmin, createProduct);

router.get("/products/edit/:id", isAdmin, editProduct);

router.post("/products/edit/:id", isAdmin, updateProduct);

router.post("/products/delete/:id", isAdmin, deleteProduct);

router.get("/orders", isAdmin, orders);

export default router;