import { useState } from "react";
import validator from 'validator';
import axios from 'axios';
import moment from 'moment';

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import "../style/style.css";

function Home() {
    const [url, setUrl] = useState("");
    const [urlInvalid, setUrlInvalid] = useState(false);
    const [response, setResponse] = useState({});
    const [retrieveDone, setRetrieveDone] = useState(false);

    const inputHandler = ((value) => {
        setUrl(value);
        setUrlInvalid(false);
    });

    const enterBtnHandler = ((e) => {
        if (e.key === 'Enter') {
            validate(url)
        }
    })

    const shortBtnHandler = (() => {
        validate(url)
    });

    const validate = ((value) => {
        if ((url.startsWith("http://") || url.startsWith("https://")) && validator.isURL(url)) {
            setRetrieveDone(false);
            axios.get('http://localhost:3500/create?url=' + value)
                .then(res => {
                    setResponse(res.data);
                    setRetrieveDone(true);
                })
        } else {
            setUrlInvalid(true);
        }
    })

    return (
        <>
            <div className="global-style">
                <Navbar />
                <div className="main">
                    <input onKeyDown={((e) => enterBtnHandler(e))} onChange={((e) => inputHandler(e.target.value))} className="input-url" type="text" placeholder="Your long URL here..." />
                    {(urlInvalid) ?
                        <p className="invalid-url">Invalid URL! Hint: always start with 'http://' or 'https://'</p>
                        : <p className="invalid-url">&nbsp;</p>
                    }
                    <button onClick={shortBtnHandler} className="shorten">Reducio!</button>
                    {
                        (retrieveDone) ?
                            <div className="retrieval-info">
                                <p>Status:<br/> <strong style={{textTransform: "capitalize"}}>{response.status}</strong></p>
                                <p>Message:<br/> <strong>{response.message}</strong></p>
                                <p>Long URL:<br/> <a href={response.long_url}>{response.long_url}</a></p>
                                <p>Short URL:<br/> <a href={response.short_url}>{response.short_url}</a></p>
                                <p>Created At:<br/> <strong>{moment(response.creation_date).format("dddd, MMMM Do YYYY")}</strong></p>
                            </div>
                            : null
                    }
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Home;