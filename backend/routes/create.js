import express from 'express';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';

import { insertDataDB, readDataDB } from "../util/db.js";

const router = express.Router();

const SHORT_URL_LENGTH = 7;

const MSG_EMPTY = "URL should not be empty!";
const MSG_SHORTENED = "Long URL successfully shortened";
const MSG_URL_INVALID = "Invalid URL form";

const STATUS_ERROR = "error";
const STATUS_SUCCESS = "success";

router.get('/', async function (req, res, next) {
    let url = req.query.url;
    let payload = {};

    // Check if URL query is empty
    if ((url != "") && (url != null)) {

        // Check if URL is valid
        if (validUrl.isUri(url)) {

            // Generate unique short URL
            let uid = await checkIfIDExist(generateShortURL());

            // Port 3500 (backend's port) replaced with 3200 (frontend's port) because the redirection will be handled by the frontend

            insertDataDB({
                "long_url": url,
                "short_url": req.protocol + "://" + (req.headers.host).replace("3500", "3200") + "/" + uid,
                "creation_date": new Date()
            })

            payload = {
                "status": STATUS_SUCCESS,
                "message": MSG_SHORTENED,
                "long_url": url,
                "short_url": req.protocol + "://" + (req.headers.host).replace("3500", "3200") + "/" + uid,
                "creation_date": new Date()
            }
        }
        else {
            payload = {
                "status": STATUS_ERROR,
                "message": MSG_URL_INVALID,
                "long_url": url,
                "short_url": null,
                "creation_date": null
            }
        }
    }
    else {
        payload = {
            "status": STATUS_ERROR,
            "message": MSG_EMPTY,
            "long_url": null,
            "short_url": null,
            "creation_date": null
        }
    }
    res.json(payload)
})

// Generate short URL using nanoid
function generateShortURL() {
    return nanoid(SHORT_URL_LENGTH);
}

// Check if the short URL already exist in database
// If short URL is already exist, create new short URL
async function checkIfIDExist(uid) {
    await readDataDB()
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].short_url.includes(uid)) {
                    uid = checkIfIDExist(generateShortURL())
                    return uid;
                }
            }
        });
    return uid;
}

export default router;