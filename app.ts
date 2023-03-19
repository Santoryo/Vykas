import { getArmory } from './armory.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const port = process.env.PORT;

app.get('/:user', async (req, res) => {
    const armory = await getArmory(req.params.user);
    res.send({armory});
});
