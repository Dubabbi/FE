//Navbar.jsx

import React from "react"
import './Navbar.css';
import { Link } from 'react-router-dom';
import Avvvatars from 'avvvatars-react'
import Navitem from '/src/assets/image/navitem.svg'

export default function Navbar() {
    return(
        <div className='navbar'>
            <div className='si__navbar'>
            <div className='si__navbar section__padding'>
                <div className='si__navbar-select'>
                    <Link to=""><img src={Navitem} alt="" width="40"/></Link>
                    <Link to=""><img src={Navitem} alt="" width="40"/></Link>
                    <Link to=""><img src={Navitem} alt="" width="40"/></Link>
                    <Link to=""><img src={Navitem} alt="" width="40"/></Link>
                    {/*<Link to=""><Avvvatars style="shape" size={40}/></Link>*/}
                </div>
            </div>
            </div>
        </div>
    )
}