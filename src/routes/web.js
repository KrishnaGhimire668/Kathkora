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

import { myOrders } from "../controllers/ordersController.js";

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

router.get("/checkout/success", (req, res) => {
    res.render("pages/success", {
        title: "Order Successful",
    });
});

router.post("/checkout", placeOrder);

router.get("/orders", myOrders);
export default router;