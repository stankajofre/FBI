// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

export default authMiddleware;
