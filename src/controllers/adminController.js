export function dashboard(req, res) {
    res.render("pages/admin/dashboard", {
        title: "Admin Dashboard",
    });
}