import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import webRoutes from "./routes/web.js";




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

// ---------- Static Files ----------

app.use(express.static(path.join(__dirname, "../public")));

// ---------- View Engine ----------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// ---------- Routes ----------
app.use("/", webRoutes);


export default app;
