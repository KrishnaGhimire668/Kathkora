import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import webRoutes from "./routes/web.js";

import session from "express-session";
import { RedisStore } from "connect-redis";

import redis from "./config/redis.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";



const app = express();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Middleware ----------

// Log every request
app.use(morgan("dev"));

// Secure common HTTP headers
app.use(helmet());

// Compress responses
app.use(compression());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON
app.use(express.json());

app.use(
    session({
        store: new RedisStore({
            client: redis,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


// ---------- Static Files ----------

app.use(express.static(path.join(__dirname, "../public")));

app.use(
    "/vendor/htmx",
    express.static(
        path.join(__dirname, "../node_modules/htmx.org/dist")
    )
);

// ---------- View Engine ----------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// ---------- Routes ----------
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/", webRoutes);


export default app;
