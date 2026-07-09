import { Router } from "express";
import passport from "passport";

import {
    authSuccess,
    logout,
} from "../controllers/authController.js";

const router = Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    authSuccess
);

router.get("/logout", logout);

export default router;