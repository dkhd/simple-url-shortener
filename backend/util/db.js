// I'm using arrow function for this module

import { join, dirname } from 'path'
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb'

// Use JSON file for storage
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Populate default data
const initDB = (async() => {
    const defaultData = [
        {
            "long_url": "https://medium.com/@dkhd",
            "short_url": "http://localhost:3200/mediumHome",
            "creation_date": new Date()
        },
        {
            "long_url": "https://itnext.io/building-a-medium-like-text-editor-in-reactjs-using-draftail-ce47ffcbe240?source=user_profile---------0----------------------------",
            "short_url": "http://localhost:3200/mediumEditor",
            "creation_date": new Date()
        },
        {
            "long_url": "https://medium.com/@dkhd/raspberry-pi-safe-shutdown-using-nespi-case-9b561d43bfd?source=user_profile---------1----------------------------",
            "short_url": "http://localhost:3200/NESPi",
            "creation_date": new Date()
        },
        {
            "long_url": "https://itnext.io/build-a-group-chat-app-in-30-lines-using-node-js-15bfe7a2417b?source=user_profile---------2----------------------------",
            "short_url": "http://localhost:3200/nodeChat",
            "creation_date": new Date()
        },
        {
            "long_url": "https://chatbotslife.com/i-run-a-machine-learning-program-on-a-raspberry-pi-and-heres-what-happened-a7f97aad6bb2?source=user_profile---------3----------------------------",
            "short_url": "http://localhost:3200/piChatbot",
            "creation_date": new Date()
        },
        {
            "long_url": "https://medium.com/@dkhd/handling-multiple-requests-on-flask-60208eacc154?source=user_profile---------7----------------------------",
            "short_url": "http://localhost:3200/flaskReq",
            "creation_date": new Date()
        }
    ]

    await db.read();
    db.data = { data: defaultData }
    await db.write();

    console.log("Init DB done!");

})

const insertDataDB = (async(newData) => {
    await db.read();
    db.data.data.push(newData);
    await db.write();
})

const readDataDB = (async() => {
    await db.read();
    return db.data.data;
})



export {
    db,
    initDB,
    insertDataDB,
    readDataDB
}