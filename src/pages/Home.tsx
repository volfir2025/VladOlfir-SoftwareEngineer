import { Link } from "react-router-dom"
import img_gears from "../assets/images/gears.png"


export default function Home() {

    console.log("   Home rendered"); 
    return (
        <div className="home-flex-container">
            <div className="home-image-wrapper">
                <img src={img_gears} alt="Gears" className="home-image" />
            </div>
            <div className="home-container">
                <h1>This React application, built with TypeScript, demonstrates my expertise in both subjects.</h1>          
                <Link to="resume" className="link-button">My Resume</Link>
            </div>
        </div>
    )
};