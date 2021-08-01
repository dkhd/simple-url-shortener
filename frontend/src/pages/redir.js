import axios from 'axios';
import { useEffect, useState } from 'react';

function Redir() {
    const [text, setText] = useState("Please wait...");

    useEffect(() => {
        let path = window.location.pathname;
        console.log(path);
        axios.get('http://localhost:3500'+path)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "error") {
                    setText("Error! "+ res.data.message);
                } else {
                    window.location.replace(res.data.data.long_url);
                }
            })
    }, [])
    return (
        <>
            <div className="global-style">
                <div className="redir-main">
                    <h3 className="please-wait">{text}</h3>
                </div>
            </div>
        </>
    )
}

export default Redir;