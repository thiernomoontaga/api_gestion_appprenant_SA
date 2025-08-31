export function errorHandler(err, _, res, __) {
    console.error(err);
    res.status(500).json({ message: "" });
}
