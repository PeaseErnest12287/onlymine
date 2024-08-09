import React from 'react'
import"./Footer.css"

function Footer() {
    return (
        <div className='foot'>
            <div className="footer-content">
                <div className="footer-logo">
                    <h1>KADESEA AGENCY LIMITED</h1>
                </div>
                <div className="footer-links">
                    <a href="#about">About Us</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                    <a href="#privacy">Privacy Policy</a>
                </div>
                <div className="footer-social">
                    <a href="www.facebook.com" className="social-icon" aria-label="Facebook"><img src="" alt="Facebook"/></a>
                    <a href="www.facebook.com" className="social-icon" aria-label="Twitter"><img src="" alt="Twitter"/></a>
                    <a href="www.facebook.com" className="social-icon" aria-label="Instagram"><img src="" alt="Instagram"/></a>
                    <a href="www.facebook.com" className="social-icon" aria-label="Instagram"><img src="" alt="WhatsApp"/></a>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 MySite. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
