import React from "react"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { JSX } from 'react'

function Footer(): JSX.Element {
    const socialLinks = [
        { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/volfir2025' },
        { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vlad-olfir' },
        { Icon: FaEnvelope, label: 'Email', href: 'mailto:"Vlad%20Olfir"<vlad.olfir@gmail.com>' },
    ];

    console.log("Footer rendered"); 

    return (
        <footer>
            <div>
                <span>&copy; {new Date().getFullYear()}</span>

                {socialLinks.map(({ Icon, label, href }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-icon"
                        aria-label={label}
                    >
                        <Icon size={24} />
                    </a>
                ))}

               
                <span>Vlad Olfir</span>
            </div>
        </footer>
    );
}

//This will make sure to render this component when nessessary:
export default React.memo(Footer)