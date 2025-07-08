import React from "react"
import { NavLink } from "react-router-dom"
import type { JSX } from 'react'

export default function Header(): JSX.Element {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline"
    }

    return (
        <header>      
            <nav>           
                <NavLink
                    to="/"
                    style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/resume"
                    style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    My Resume
                </NavLink>
                <NavLink
                    to="/settings"
                    style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Settings
                </NavLink>       
            </nav>
        </header>
    )
}