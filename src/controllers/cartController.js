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

    return res.send("Added to cart");
}

export async function viewCart(req, res) {
    try {
        const cartKey = "kathakora:cart:guest";
        const cartItems = await redis.lRange(cartKey, 0, -1);

        if (!cartItems || cartItems.length === 0) {
            // Empty cart case
            return res.render("pages/cart", {
                title: "Your Cart",
                cartItems: [],
                total: 0
            });
        }

        // Parse all cart items
        const parsedItems = [];
        const productIds = [];

        for (const itemStr of cartItems) {
            try {
                const item = JSON.parse(itemStr);
                parsedItems.push(item);
                if (item.productId && productIds.indexOf(item.productId.toString()) === -1) {
                    productIds.push(item.productId.toString());
                }
            } catch (e) {
                console.error("Error parsing cart item:", e);
                // Skip invalid items
            }
        }

        // Fetch product details for all unique product IDs
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = {};
        products.forEach(p => {
            productMap[p._id.toString()] = p;
        });

        // Build cart view items with product details
        const cartViewItems = [];
        let grandTotal = 0;

        for (const item of parsedItems) {
            const product = productMap[item.productId];
            if (!product) continue; // Skip if product not found

            const subtotal = product.price * item.quantity;
            grandTotal += subtotal;

            cartViewItems.push({
                productId: item.productId,
                size: item.size,
                quantity: item.quantity,
                name: product.name,
                image: product.image,
                price: product.price,
                subtotal: subtotal
            });
        }

        res.render("pages/cart", {
            title: "Your Cart",
            cartItems: cartViewItems,
            total: grandTotal
        });
    } catch (error) {
        console.error("Error in viewCart:", error);
        res.status(500).send("Internal Server Error");
    }
}
