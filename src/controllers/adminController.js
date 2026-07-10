import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export async function dashboard(req, res) {
    try {

        const [products, orders, users, revenue] = await Promise.all([
            Product.countDocuments(),
            Order.countDocuments(),
            User.countDocuments(),
            Order.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$total" }
                    }
                }
            ])
        ]);

        res.render("pages/admin/dashboard", {
            title: "Admin Dashboard",
            stats: {
                products,
                orders,
                users,
                revenue: revenue[0]?.total || 0,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export async function products(req, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.render("pages/admin/products", {
            title: "Manage Products",
            products,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export function newProduct(req, res) {
    res.render("pages/admin/new-product", {
        title: "Add Product",
    });
}

export async function createProduct(req, res) {
    try {

        const {
            name,
            slug,
            price,
            image,
            category,
            stock,
            featured,
            sizes,
        } = req.body;

        await Product.create({
            name,
            slug,
            price,
            image,
            category,
            stock,
            featured: featured === "on",
            sizes: sizes
                ? sizes.split(",").map(size => size.trim())
                : ["S", "M", "L", "XL"],
        });

        res.redirect("/admin/products");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export async function editProduct(req, res) {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.redirect("/admin/products");
        }

        res.render("pages/admin/edit-product", {
            title: "Edit Product",
            product,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export async function updateProduct(req, res) {
    try {

        const {
            name,
            slug,
            price,
            image,
            category,
            stock,
            featured,
            sizes,
        } = req.body;

        await Product.findByIdAndUpdate(req.params.id, {
            name,
            slug,
            price,
            image,
            category,
            stock,
            featured: featured === "on",
            sizes: sizes
                ? sizes.split(",").map(size => size.trim())
                : ["S", "M", "L", "XL"],
        });

        res.redirect("/admin/products");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export async function deleteProduct(req, res) {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.redirect("/admin/products");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export async function orders(req, res) {
    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.render("pages/admin/orders", {
            title: "Orders",
            orders,
        });

    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");

    }
}

export async function updateOrderStatus(req, res) {
    try {

        const { status } = req.body;

        await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.redirect("/admin/orders");

    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");

    }
}