import express from 'express';

import { readDataDB } from "../util/db.js";

const router = express.Router();

router.get('/', async function (req, res, next) {
    let payload = await readDataDB()
        .then((data) => {
            return data
        });


    res.json(payload)
})

export default router;