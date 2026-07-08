import redis from "../config/redis.js";
import Product from "../models/Product.js";

export async function addToCart(req, res) {
    const { productId, size, quantity } = req.body;

    if (!size) {
        return res.status(400).send("Please select a size.");
    }

    const cartKey = "kathakora:cart:guest";

    const item = {
        productId,
        size,
        quantity: Number(quantity),
    };

    await redis.rPush(cartKey, JSON.stringify(item));

    // Trigger HTMX event on success
    res.set("HX-Trigger", "cart-added");

    return res.send("");
}

export async function viewCart(req, res) {
    try {
        const cartKey = "kathakora:cart:guest";
        const cartItems = await redis.lRange(cartKey, 0, -1);

        if (!cartItems || cartItems.length === 0) {
            return res.render("pages/cart", {
                title: "Your Cart",
                cartItems: [],
                total: 0,
            });
        }

        const parsedItems = [];
        const productIds = [];

        for (const itemStr of cartItems) {
            try {
                const item = JSON.parse(itemStr);
                parsedItems.push(item);

                if (
                    item.productId &&
                    !productIds.includes(item.productId.toString())
                ) {
                    productIds.push(item.productId.toString());
                }
            } catch (err) {
                console.error("Error parsing cart item:", err);
            }
        }

        const products = await Product.find({
            _id: { $in: productIds },
        });

        const productMap = {};

        products.forEach((product) => {
            productMap[product._id.toString()] = product;
        });

        const cartViewItems = [];
        let grandTotal = 0;

        for (const item of parsedItems) {
            const product = productMap[item.productId];

            if (!product) continue;

            const subtotal = product.price * item.quantity;

            grandTotal += subtotal;

            cartViewItems.push({
                productId: item.productId,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
                size: item.size,
                subtotal,
            });
        }

        return res.render("pages/cart", {
            title: "Your Cart",
            cartItems: cartViewItems,
            total: grandTotal,
        });
    } catch (error) {
        console.error("Error in viewCart:", error);
        return res.status(500).send("Internal Server Error");
    }
}