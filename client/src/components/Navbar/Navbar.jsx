import { ArrowDropDown, Face, Notifications, Search } from '@material-ui/icons'
import React from 'react'
import './navbar.scss'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {

    const[isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () =>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null); //clean-up function to avoid infinite loop
    } 

    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="" />
                        <Link to='/' className='link'><span>Home</span></Link>
                        <Link to='/series' className='link'><span>Series</span></Link>
                        <Link to='/movies' className='link'><span>Movies</span></Link>
                        <span>New and Popular</span>
                        <span>My List</span>
                </div>
                <div className="right">
                    <Search className='icon'/>
                    <span>KID</span>
                    <Notifications className='icon'/>
                    <Face className='face'/>
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
