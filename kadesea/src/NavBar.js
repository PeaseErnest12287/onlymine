import React from 'react'
import "./NavBar.css"
import Logo from "./Logo used.jpeg"
import Arrow from "./th.svg"
import OurServices from './OurServices'

function NavBar(props) {
    const method = props.fun
    const Method = props.mine

    
    return (
        <div>
            <div className='main one'>
                {/* this is the logo area */}
                <div className='LogoOnly'>
                    <div className="logo">
                        <img src={Logo} alt=""></img>
                    </div>
                    <div><h1>Kadesea Agency Limited</h1></div>

                </div>
                {/* this ia the pages area */}
                <div className='pages'>
                    <ul>
                        <li>Home <img src={Arrow} alt='arrow'></img></li>
                        <li onClick={props.setd(<OurServices/>)}>Our Services <img src={Arrow} alt='arrow'></img></li>
                        <li >Our team <img  src={Arrow} alt='arrow'></img></li>
                        <li>Testimonials <img src={Arrow} alt='arrow'></img></li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className='auth'>
                    <button  class="tab-button active" onClick={method}>Login</button>
                    <button class="tab-button" onclick={Method}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
