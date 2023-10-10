import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import google from '../../assets/google.svg'
import instagram from '../../assets/instagram.svg'

import './header.scss'

const Header = (props) => {

    const {isAuth, email} = useAuth()

    const profileCheck = (res, email) => {
        if (res) {
            return <Link to='/profile' className="functional-link">{email}</Link>
        }

        return(
            <>
                <Link to='/singup' className="functional-link">Sign up</Link>
                | 
                <Link to='/login' className="functional-link">Login</Link>
            </>
        )
    }
    
    const profileChecked = profileCheck(isAuth, email)

    return (
        <header className="header">
            <div className="header-linkbar">
                <div className="container">
                    <div className="header-linkbar-inner">
                        <div className="functional-links">
                            {profileChecked}
                        </div>
                        <div className="socialmedia-links">
                            <a href="https://www.facebook.com/" target='__blank' className="socialmedia-link">
                                <img src={facebook} alt="" />
                            </a>
                            <a href="https://twitter.com/" target='__blank' className="socialmedia-link">
                                <img src={twitter} alt="" />
                            </a>
                            <a href="https://www.google.com/" target='__blank' className="socialmedia-link">
                                <img src={google} alt="" />
                            </a>
                            <a href="https://www.instagram.com/" target='__blank' className="socialmedia-link">
                                <img src={instagram} alt="" />
                            </a>
                        </div>
                    </div>        
                </div>       
            </div>
            <div className="header-titles">
                <div className="container">
                    <div className="header-titles-inner">
                        <Link to={'/'} className="header-titles-title">MAG MAGAZINE</Link>
                        <Link to={'/'} className="header-titles-subtitle">ALL THE LATEST NEWS & INFORMATION IN THE WORLD</Link>
                    </div>
                </div>
            </div>
            {props.children}
        </header>
    )
}

export default Header