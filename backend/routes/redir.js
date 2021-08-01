import express from 'express';
import { readDataDB } from "../util/db.js";

const router = express.Router();

const URL_FOUND = "Short URL found";
const URL_NOT_FOUND = "Short URL is not found";

const STATUS_ERROR = "error";
const STATUS_SUCCESS = "success";

router.get('*', async function (req, res, next) {
    let url = req.originalUrl;
    console.log(url);
    let payload = await readDataDB()
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].short_url.includes(url)) {
                    console.log("FOUND");
                    return {
                        "status": STATUS_SUCCESS,
                        "message": URL_FOUND,
                        "data": data[i]
                    };
                }
            }
            return {
                "status": STATUS_ERROR,
                "message": URL_NOT_FOUND,
                "data": {}
            }
        });


    res.json(payload)
})

export default router;