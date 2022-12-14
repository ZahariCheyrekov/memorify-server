import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { SALT, TOKEN_EXPIRATION_TIME } from '../constants/index.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User doesn\'t exist.' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, repeatPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        if (password !== repeatPassword) {
            return res.status(400).json({ message: 'Passwords don\'t match.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}