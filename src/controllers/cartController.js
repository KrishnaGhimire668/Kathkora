import redis from "../config/redis.js";
import Product from "../models/Product.js";

export async function addToCart(req, res) {
    try {
        const { productId, size, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Missing product."
            });
        }

        if (!size) {
            return res.status(400).json({
                success: false,
                message: "Please select a size."
            });
        }

        const cartKey = "kathakora:cart:guest";

        await redis.rPush(
            cartKey,
            JSON.stringify({
                productId,
                size,
                quantity: Number(quantity) || 1,
            })
        );

        return res.status(200).json({
            success: true,
            message: "Added to cart"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
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