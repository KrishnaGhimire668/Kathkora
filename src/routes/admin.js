import { Router } from "express";
import { dashboard } from "../controllers/adminController.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.get("/", isAdmin, dashboard);

export default router;