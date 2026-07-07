import Product from "../models/Product.js";

export async function productDetails(req, res) {
    const product = await Product.findOne({
        slug: req.params.slug,
    });

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.render("pages/product", {
        title: product.name,
        product,
    });
}