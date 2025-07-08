import React from "react";
import { ThemeContext } from "../App"

import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

type ThemeContextType = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Settings() {
    const theme = React.useContext(ThemeContext);

    if (!theme) {
        return null;
    }

    const { darkMode, setDarkMode }: ThemeContextType = theme;
 
    return (       
        <div className="theme-toggle-container">
            {darkMode && <div
                className={`theme-toggle${!darkMode ? "" : " dark"}`}
                onClick={() => setDarkMode(false)}
                style={{ border: !darkMode ? "2px solid #bfc9d9" : "none" }}
            >
                <span className="toggle-knob left">
                    <FiSun />
                </span>
                <span className="toggle-label right">LIGHT<br />MODE</span>
            </div>}
            {!darkMode  && <div
                className={`theme-toggle${darkMode ? " dark" : ""}`}
                onClick={() => setDarkMode(true)}
                style={{ border: darkMode ? "2px solid #23262b" : "none" }}
            >
                <span className="toggle-label left">DARK<br />MODE</span>
                <span className="toggle-knob right">
                    <FaMoon />
                </span>
            </div>}
        </div>     
    );
}