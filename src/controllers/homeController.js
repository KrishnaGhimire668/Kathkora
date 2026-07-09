import Product from "../models/Product.js";

export async function home(req, res) {
    const featuredProducts = await Product.find({ featured: true }).limit(3);

    res.render("pages/home", {
        title: "Kathakora",
        featuredProducts,
    });
}