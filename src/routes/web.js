import { Router } from "express";
import { home } from "../controllers/homeController.js";
import { shop } from "../controllers/shopController.js";
import { productDetails } from "../controllers/productController.js";
import { addToCart } from "../controllers/cartController.js";
import { viewCart } from "../controllers/cartController.js"; // New import

const router = Router();

router.get("/", home);

router.get("/shop", shop);

router.get("/product/:slug", productDetails);

router.post("/cart", addToCart);

router.get("/cart", viewCart); // New route

export default router;
