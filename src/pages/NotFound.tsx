import { Link } from "react-router-dom"

export default function NotFound() {

    console.log("   NotFound rendered");
    return (
        <div className="not-found-container">
            <h1>Sorry, the page you were looking for was not found.</h1>
            <Link to="/" className="link-button">Return to Home</Link>
        </div>
    )
}