import { Router } from "express";
import {
    dashboard,
    products,
    newProduct,
    createProduct,
    editProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/adminController.js";

import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.get("/", isAdmin, dashboard);

router.get("/products", isAdmin, products);

router.get("/products/new", isAdmin, newProduct);

router.post("/products", isAdmin, createProduct);

router.get("/products/edit/:id", isAdmin, editProduct);

router.post("/products/edit/:id", isAdmin, updateProduct);

router.post("/products/delete/:id", isAdmin, deleteProduct);

export default router;