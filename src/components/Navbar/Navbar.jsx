//Navbar.jsx

import React from "react"
import './Navbar.css';
import { Link } from 'react-router-dom';
import Avvvatars from 'avvvatars-react'
import Navitem from '/src/assets/image/navitem.svg'
import Profile from '/src/assets/image/profile.svg'
import Home from '/src/assets/image/home.svg'
import Pen from '/src/assets/image/pen.svg'
import Notice from '/src/assets/image/notice.svg'

export default function Navbar() {
    return(
        <div className='navbar'>
            <div className='si__navbar'>
            <div className='si__navbar section__padding'>
                <div className='si__navbar-select'>
                    <Link to=""><img src={Home} alt="" width="40"/></Link>
                    <Link to=""><img src={Pen} alt="" width="40"/></Link>
                    <Link to=""><img src={Notice} alt="" width="40"/></Link>
                    <Link to=""><img src={Profile} alt="" width="40"/></Link>
                    {/*<Link to=""><Avvvatars style="shape" size={40}/></Link>*/}
                </div>
            </div>
            </div>
        </div>
    )
}