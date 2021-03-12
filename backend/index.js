import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(bodyParser.json());
// __dirname in son available if using ES6, only in commonJS!
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(
        `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
