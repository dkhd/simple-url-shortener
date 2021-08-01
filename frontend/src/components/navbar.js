import {
    NavLink
} from "react-router-dom";

function Navbar() {
    return (
        <>
            <h1 className="title-name">Simple URL Shortener</h1>
            <div className="topnav">
                <NavLink exact to="/" activeClassName="active">Home</NavLink >
                <NavLink to="/history" activeClassName="active">History</NavLink >
            </div>
        </>
    )
}

export default Navbar;