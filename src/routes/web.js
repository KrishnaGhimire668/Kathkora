import { Router } from "express";
import { home } from "../controllers/homeController.js";
import { shop } from "../controllers/shopController.js";
import { productDetails } from "../controllers/productController.js";

import {
    addToCart,
    viewCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../controllers/cartController.js";




import {
    checkout,
    placeOrder,
} from "../controllers/checkoutController.js";

const router = Router();

router.get("/", home);

router.get("/shop", shop);

router.get("/product/:slug", productDetails);

router.post("/cart", addToCart);

router.get("/cart", viewCart);

router.post("/cart/remove/:index", removeFromCart);

router.post("/cart/increase/:index", increaseQuantity);

router.post("/cart/decrease/:index", decreaseQuantity);

router.get("/checkout", checkout);
router.post("/checkout", placeOrder);

export default router;