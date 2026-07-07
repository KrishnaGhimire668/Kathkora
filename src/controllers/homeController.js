import Product from "../models/Product.js";

export async function home(req, res) {
    const featuredProducts = await Product.find({ featured: true }).limit(4);

    res.render("pages/home", {
        title: "Kathakora",
        featuredProducts,
    });
}