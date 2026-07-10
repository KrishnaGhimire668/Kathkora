import Order from "../models/Order.js";

export async function myOrders(req, res) {
    try {

        if (!req.user) {
            return res.redirect("/auth/google");
        }

        const orders = await Order.find({
            email: req.user.email,
        }).sort({ createdAt: -1 });

        res.render("pages/orders", {
            title: "My Orders",
            orders,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}