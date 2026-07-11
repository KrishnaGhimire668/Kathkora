export default function getCartKey(req) {

    if (req.user) {
        return `kathakora:cart:${req.user._id}`;
    }

    return "kathakora:cart:guest";

}