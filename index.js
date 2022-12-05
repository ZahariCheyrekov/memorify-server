import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import cardsRoutes from './routes/cards.js';
import userRoutes from './routes/users.js';

import { configDatabase } from './config/configDatabase.js';
import { DEFAULT_PORT } from './constants/index.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use('/memories', cardsRoutes); 
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Application is running correctly.');
});

const PORT = process.env.PORT || DEFAULT_PORT;

configDatabase(app, PORT);