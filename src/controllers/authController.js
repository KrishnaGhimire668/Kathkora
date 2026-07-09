export function authSuccess(req, res) {
    res.redirect("/");
}

export function logout(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy(() => {
            res.redirect("/");
        });
    });
}