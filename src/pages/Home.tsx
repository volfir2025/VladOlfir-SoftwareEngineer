import React from "react"
import { Link } from "react-router-dom"
import img_gears from "../assets/images/gears.png"


export default function Home() {
    return (
        <div className="home-flex-container">
            <div className="home-image-wrapper">
                <img src={img_gears} alt="Gears" className="home-image" />
            </div>
            <div className="home-container">
                <h1>This is a React app to show my knowledge of the subject.</h1>          
                <Link to="resume" className="link-button">My Resume</Link>
            </div>
        </div>
    )
};