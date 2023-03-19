import { getArmory } from './armory.js';
import express from 'express';
import dotenv from 'dotenv';
import { update } from './update.js'

dotenv.config()
const app = express();
const port = process.env.PORT;

app.get('/v2/loa/:user', async (req, res) => {
    const armory = await getArmory(req.params.user);
    await update(armory.armory, armory.userId);

    res.send({armory: armory.armory});
});


app.listen(port);