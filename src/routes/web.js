import { Router } from "express";

import { home } from "../controllers/homeController.js";
import { shop } from "../controllers/shopController.js";
import { productDetails } from "../controllers/productController.js";

const router = Router();

router.get("/", home);

router.get("/shop", shop);

router.get("/product/:slug", productDetails);

export default router;