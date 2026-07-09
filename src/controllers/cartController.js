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

        const cartItems = await redis.lRange(cartKey, 0, -1);

        let updated = false;

        const newCart = cartItems.map((itemStr) => {
            const item = JSON.parse(itemStr);

            if (
                item.productId === productId &&
                item.size === size
            ) {
                item.quantity += Number(quantity) || 1;
                updated = true;
            }

            return JSON.stringify(item);
        });

        if (updated) {
            await redis.del(cartKey);

            if (newCart.length) {
                await redis.rPush(cartKey, newCart);
            }
        } else {
            await redis.rPush(
                cartKey,
                JSON.stringify({
                    productId,
                    size,
                    quantity: Number(quantity) || 1,
                })
            );
        }

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

export async function removeFromCart(req, res) {
    try {

        const cartKey = "kathakora:cart:guest";
        const indexToRemove = Number(req.params.index);

        const cartItems = await redis.lRange(cartKey, 0, -1);

        const updatedCart = cartItems.filter(
            (_, index) => index !== indexToRemove
        );

        await redis.del(cartKey);

        if (updatedCart.length) {
            await redis.rPush(cartKey, updatedCart);
        }

        return res.redirect("/cart");

    } catch (err) {

        console.error(err);
        return res.status(500).send("Internal Server Error");

    }
}

export async function viewCart(req, res) {
    try {

        const cartKey = "kathakora:cart:guest";
        const cartItems = await redis.lRange(cartKey, 0, -1);

        if (!cartItems.length) {
            return res.render("pages/cart", {
                title: "Your Cart",
                cartItems: [],
                total: 0,
            });
        }

        const parsedItems = [];
        const productIds = [];

        for (const itemStr of cartItems) {

            const item = JSON.parse(itemStr);

            parsedItems.push(item);

            if (!productIds.includes(item.productId)) {
                productIds.push(item.productId);
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

        parsedItems.forEach((item, index) => {

            const product = productMap[item.productId];

            if (!product) return;

            const subtotal = product.price * item.quantity;

            grandTotal += subtotal;

            cartViewItems.push({
                cartIndex: index,
                productId: item.productId,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
                size: item.size,
                subtotal,
            });

        });

        return res.render("pages/cart", {
            title: "Your Cart",
            cartItems: cartViewItems,
            total: grandTotal,
        });

    } catch (err) {

        console.error(err);
        return res.status(500).send("Internal Server Error");

    }
}

export async function increaseQuantity(req, res) {
    try {
        const cartKey = "kathakora:cart:guest";
        const index = Number(req.params.index);

        const cartItems = await redis.lRange(cartKey, 0, -1);

        if (index < 0 || index >= cartItems.length) {
            return res.redirect("/cart");
        }

        const updatedCart = cartItems.map((itemStr, i) => {
            const item = JSON.parse(itemStr);

            if (i === index) {
                item.quantity += 1;
            }

            return JSON.stringify(item);
        });

        await redis.del(cartKey);

        if (updatedCart.length) {
            await redis.rPush(cartKey, updatedCart);
        }

        return res.redirect("/cart");

    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function decreaseQuantity(req, res) {
    try {
        const cartKey = "kathakora:cart:guest";
        const index = Number(req.params.index);

        const cartItems = await redis.lRange(cartKey, 0, -1);

        if (index < 0 || index >= cartItems.length) {
            return res.redirect("/cart");
        }

        const updatedCart = [];

        cartItems.forEach((itemStr, i) => {
            const item = JSON.parse(itemStr);

            if (i === index) {
                item.quantity -= 1;

                if (item.quantity > 0) {
                    updatedCart.push(JSON.stringify(item));
                }
            } else {
                updatedCart.push(itemStr);
            }
        });

        await redis.del(cartKey);

        if (updatedCart.length) {
            await redis.rPush(cartKey, updatedCart);
        }

        return res.redirect("/cart");

    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}