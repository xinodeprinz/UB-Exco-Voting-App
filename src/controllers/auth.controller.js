import pool from "../database.js";
import { randomString } from "../helpers/functions.js";
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../database/models/User.js';

export const login = async (req, res, next) => {
    // Validating matricule
    if (!req.body.matricule || typeof req.body.matricule !== 'string') {
        return res.status(422).json({ message: "The matricule is required." });
    }

    // Validating password
    if (!req.body.password || typeof req.body.password !== 'string') {
        return res.status(422).json({ message: "The password is required." });
    }

    const { matricule, password } = req.body;

    try {
        // Authenticating user
        const [user] = await User.query().where('matricule', matricule);

        if (!user) {
            return res.status(400).json({ message: "Wrong matricule or password." });
        }

        const isAllowed = await bcrypt.compare(password, user.password);

        if (isAllowed) {
            const { JWT_SECRET } = process.env;
            const token = jwt.sign(user.toJSON(), JWT_SECRET); // { expiresIn: '1h' }
            delete user.password;
            return res.json({ message: "Login successful", token, user });
        } else {
            return res.status(400).json({ message: "Wrong matricule or password." });
        }
    } catch (error) {
        return next(createError[500]);
    }
}

export const register = async (req, res, next) => {
    const filename = randomString(50);
    const file = req.files.photo;
    const ext = file.name.split('.').pop();
    const path = `/images/${filename}.${ext}`;
    file.mv(`./public/images/${filename}.${ext}`);

    const { name, matricule, faculty, department, option, level, password } = req.body;
    // Hash password 
    const hash = await bcrypt.hash(password, 10);

    const data = [
        name, matricule, faculty, department, option, level, hash, path, new Date()
    ];

    const query = `INSERT INTO users 
    (name, matricule, faculty, department, option, level, password, photo, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, data, (err, result) => {
        if (err)
            return res.status(500).json(err);
        return res.status(201).json({ message: "User created." })
    });
}