import { Router } from "express";
import { home } from "../controllers/homeController.js";
import { shop } from "../controllers/shopController.js";

const router = Router();

router.get("/", home);
router.get("/shop", shop);

export default router;