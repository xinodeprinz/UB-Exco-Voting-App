import jwt from 'jsonwebtoken';

export const handleErrors = (err, req, res, next) => {
    return res.json(err);
}


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ').pop();

    if (!token) return res.status(401).json({ message: "Unauthorized" })

    const { JWT_SECRET } = process.env;

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;

        next();
    })
}