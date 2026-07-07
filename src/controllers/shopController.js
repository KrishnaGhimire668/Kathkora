import Product from "../models/Product.js";

export async function shop(req, res) {
    const products = await Product.find().sort({ createdAt: -1 });

    res.render("pages/shop", {
        title: "Shop",
        products,
    });
}