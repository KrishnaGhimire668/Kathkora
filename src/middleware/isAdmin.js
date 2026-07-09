export default function isAdmin(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.redirect("/");
    }

    if (req.user.role !== "admin") {
        return res.redirect("/");
    }

    next();
}