import React from 'react';
import { Link } from 'react-router-dom';
import './toolbar.css';
import { isAuthenticated} from '../autho/Repository';
import menuBlack from './img/menu-black.svg';
import menuWhite from './img/menu-white.svg';
import Avatar from '../components/loggedinUser/Avatar'

export default class Toolbar extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            menuIcon: menuBlack,
            menuClosed: true
        }
        this.handleClickBeyondSidebar = this.handleClickBeyondSidebar.bind(this)
        this.mobileMenuToggle = this.mobileMenuToggle.bind(this)
    }
    logOut(){
        localStorage.removeItem('x-access-token');
        }
    mobileMenuToggle() {
        const mobileNav = document.querySelector('#mobileMenu')
        const contentElement = document.querySelector('#root')
        if (mobileNav.classList == 'mmClosed') {
            this.handleClickBeyondSidebar(contentElement, mobileNav)
            mobileNav.classList = 'mmOpen'
        } else { 
            this.handleClickBeyondSidebar(contentElement, mobileNav) 
            mobileNav.classList = 'mmClosed'
        }
    }
    handleClickBeyondSidebar(x, y) {
        const child = document.querySelector('#mobileNavBarList').childNodes
        if(y.classList.value === 'mmOpen') {
            x.removeEventListener("click", this.mobileMenuToggle)
        } else {
            x.addEventListener('click', this.mobileMenuToggle)
        }
    }
    closeMobileMenu() {
        document.querySelector('#mobileMenu').classList = 'mmClosed'
    }
    render() {
        const isLoggedIn = this.props.isLoggedIn
        return (
        <div >{isLoggedIn}
            {(isAuthenticated() ) ? 
                <LoggedInMenu 
                    userDetails={this.props.userDetails} 
                    onClick={this.mobileMenuToggle}/>
                :
                <LandingMenu onClick={this.mobileMenuToggle}/>
            }
        </div>
        )
    }
}
class LandingMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuIcon: menuWhite
        }
    }
    render() {
        return (
            <div className="navBar" id="mainNav">
                <MobileMenu onClick={this.mobileMenuToggle}/>
                <div className='navBarContainer'>
                    <div className='navBarTitle'>
                        <h1><Link to="/">dovoli</Link></h1>
                    </div>
                    <ul id="mainMenuList">
                        <li className="menuList">
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <img id='navManuIcon' alt="menu" src={ this.state.menuIcon } onClick={this.props.onClick} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
class LoggedInMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuIcon: menuBlack
        }
    }
    logOut(){
        localStorage.removeItem('x-access-token');
        }
    render() {
        return (
            <div className="navBarLI" id="mainNav">
                <MobileMenu onClick={this.mobileMenuToggle}/>
                <div className='navBarContainer'>
                    <div className="toolbar-avatar">
                        <Avatar 
                            userData={
                                this.props.userDetails.id+
                                this.props.userDetails.fname+
                                this.props.userDetails.lname
                            }
                            hasProfileImg={this.props.userDetails.profile_pic}
                        />
                    </div>
                    
                    <div className='navBarTitle'>
                        <h1><Link to="/">dovoli</Link></h1>
                    </div>
                    <ul id="mainMenuList"> 
                        <li className="menuList">
                            <Link to="/notes">notes</Link>
                        </li> 
                        <li className="menuList">
                            <Link to="/settings">settings</Link>
                        </li>
                        <li className="menuList" onClick={this.logOut}>
                            <a href="/">Log out</a> 
                        </li>
                        <li>
                            <img id='navManuIcon' alt="menu" src={ this.state.menuIcon } onClick={this.props.onClick} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
class MobileMenu extends React.Component {
logOut() {
    localStorage.removeItem('x-access-token');
}
    render() {
        return (
            <div id="mobileMenu" className="mmClosed">
                <ul className="mobileNavBarList" id="mobileNavBarList" onClick={this.props.onClick}>
                    {( isAuthenticated() ) ?
                        <li>
                            <Link to="/notes">notes</Link>
                        </li> 
                        : ''
                    }
                    {( isAuthenticated() ) ?
                        <li>
                            <Link to="/settings">settings</Link>
                        </li> 
                        : ''
                    }
                    {( isAuthenticated() ) ? (   
                        <li onClick={this.logOut}>
                            <a href="/">Log out</a> 
                        </li>) : 
                    ( 
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                    )
                    }
                </ul>
            </div>
        )
    }
}
