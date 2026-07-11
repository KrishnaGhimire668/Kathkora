import redis from "../config/redis.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import getCartKey from "../utils/cartKey.js";

export async function checkout(req, res) {
    const cartKey = getCartKey(req);

    const cartItems = await redis.lRange(cartKey, 0, -1);

    const parsedItems = cartItems.map(item => JSON.parse(item));

    const productIds = parsedItems.map(item => item.productId);

    const products = await Product.find({
        _id: { $in: productIds },
    });

    const productMap = {};

    products.forEach(product => {
        productMap[product._id.toString()] = product;
    });

    let total = 0;

    const items = parsedItems.map(item => {

        const product = productMap[item.productId];

        total += product.price * item.quantity;

        return {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: item.quantity,
            size: item.size,
        };

    });

    res.render("pages/checkout", {
        title: "Checkout",
        items,
        total,
    });
}

export async function placeOrder(req, res) {

    try {

        const { name, email, phone, address } = req.body;

        const cartKey = getCartKey(req);


        const cartItems = await redis.lRange(cartKey, 0, -1);

        if (!cartItems.length) {
            return res.redirect("/cart");
        }

        const parsedItems = cartItems.map(item => JSON.parse(item));

        const productIds = parsedItems.map(item => item.productId);

        const products = await Product.find({
            _id: { $in: productIds },
        });

        const productMap = {};

        products.forEach(product => {
            productMap[product._id.toString()] = product;
        });

        let total = 0;

        const items = parsedItems.map(item => {

            const product = productMap[item.productId];

            total += product.price * item.quantity;

            return {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
                size: item.size,
            };

        });

        await Order.create({
            user: req.user?._id || null,
            name,
            email,
            phone,
            address,
            items,
            total,
        });

        await redis.del(cartKey);

        res.redirect("/checkout/success");

    } catch (err) {

        console.error(err);
        res.status(500).send("Internal Server Error");

    }
}