import React from 'react';
import { Link } from 'react-router-dom';
import './toolbar.css';
import { isAuthenticated,
    getCampaignDetails, 
    getOutreachCalls, 
    getCandidateCallList,
    getCampaignStaff,
    getTodo,
    logOutTime,
    notificationRead} from '../autho/Repository';
import menuBlack from './img/menu-black.svg';
import menuWhite from './img/menu-white.svg';
import Avatar from '../components/loggedinUser/Avatar'
import reminder from '../img/icons/reminder_set.svg';

export default class Toolbar extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            menuIcon: menuBlack,
            menuClosed: true,
            toDo: []
        }
        this.handleClickBeyondSidebar = this.handleClickBeyondSidebar.bind(this)
        this.mobileMenuToggle = this.mobileMenuToggle.bind(this)
    }
    mobileMenuToggle() {
        const mobileNav = document.querySelector('#mobileMenu')
        const contentElement = document.querySelector('#root')
        if (mobileNav.classList.value === 'mmClosed') {
            this.handleClickBeyondSidebar(contentElement, mobileNav)
            mobileNav.classList = 'mmOpen'
        } else { 
            this.handleClickBeyondSidebar(contentElement, mobileNav) 
            mobileNav.classList = 'mmClosed'
        }
    }
    handleClickBeyondSidebar(x, y) {
        if(y.classList.value === 'mmOpen') {
            x.removeEventListener("click", this.mobileMenuToggle)
        } else {
            x.addEventListener('click', this.mobileMenuToggle)
        }
    }
    closeMobileMenu() {
        document.querySelector('#mobileMenu').classList = 'mmClosed'
    }
    componentDidUpdate() {
        if(isAuthenticated() ) {
            getTodo()   
            .then(res => this.setState({toDo: res}))
            .catch(err => alert(err))
        } else;
    }
    render() {
        const isLoggedIn = this.props.isLoggedIn
        return (
        <div >{isLoggedIn}
            {(isAuthenticated() ) ? 
                <LoggedInMenu 
                    todoNotification={this.state.toDo}
                    userDetails={this.props.userDetails} 
                    onClick={this.mobileMenuToggle}/>
                :
                <LandingMenu/>
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
        window.onscroll = () => {
            const nav = document.querySelector('#landingNav');

            if(nav === null || undefined) {
            } else {
                if(window.scrollY <= 10) {
                    nav.className = 'navBar'
                    this.setState({menuIcon: menuWhite})
                }
                else {
                    nav.className = 'navBar scrollBar';
                    this.setState({menuIcon: menuBlack})
                    }
                }; 
            }
        return (
            <div className="navBar" id="landingNav">
                <MobileMenu onClick={this.mobileMenuToggle}/>
                <div className='navBarContainer'>
                    <div style={{margin: 'auto'}}>
                        <h1><Link to="/">dovoli</Link></h1>
                    </div>
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
        logOutTime()
        .then(res => console.log(res))
        .then(localStorage.removeItem('x-access-token'))
        .catch(err => console.log(err))
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
                        <h1><Link to="/home">dovoli</Link></h1>
                    </div>
                    <ul id="mainMenuList">
                        <Notifications 
                            userDetails={this.props.userDetails}/>
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
    logOut(){
        logOutTime()
        .then(res => console.log(res))
        .then(localStorage.removeItem('x-access-token'))
        .catch(err => console.log(err))
        }
    render() {
        return (
            <div id="mobileMenu" className="mmClosed">
                <ul className="mobileNavBarList" id="mobileNavBarList" onClick={this.props.onClick}>
                    {( isAuthenticated() ) ?
                        <li>
                            <Link to="/home">home</Link>
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
const Notifications = (props) => {
    const [todo, setTodo] = React.useState([])
    const [notificationOpen, setNotificationOpen] = React.useState(0)
    React.useEffect(() => {
        if(isAuthenticated() ) {
            getTodo()   
            .then(res => setTodo(res.reverse()))
            .catch(err => alert(err))
        } else;
    }, [])



    const NotificationOpen = () => {
        let notificationArray = []
        const filterNotifications = (data) => {
            return data.created > props.userDetails.last_loggedoff && !data.read_by.includes(props.userDetails.id)
        }
        setNotificationOpen(1)
        let notificationUnread = todo.filter(filterNotifications)
        notificationUnread.map(read => 
            notificationRead(read.id) 
                .then(res => console.log(res))
                .catch(err => console.log(err))
            )
        }
        const NotificationClose = () => {
            setNotificationOpen(0)
            getTodo()
                .then(res => setTodo(res.reverse()))
                .catch(err => alert(err))
        }
        
    const notificationCount = () => {
        return todo.filter(todo => todo.created > props.userDetails.last_loggedoff && !todo.read_by.includes(props.userDetails.id)).length
        
    }
    const convertTime = (x) => {
        let time = x.split('T')[1]
        let minuites = time.split(':')[1]
        let hour = time.split(':')[0]
        let twelveHour = hour > 12 ? hour - 12 : hour 
        return `${twelveHour}:${minuites} ${hour > 12 ? 'PM' : 'AM' }`

    }
    return (
        <div className="notification-container">
            {notificationOpen !== 0 ? 
                <div className="notification-container-open">
                    <h3>notifications</h3>
                    <h4>{notificationCount()} new</h4>
                    {todo.filter(todo => todo.created > props.userDetails.last_loggedoff && !todo.read_by.includes(props.userDetails.id)).map(todo => (
                        <div 
                            className='notification-list'
                            key ={todo.id}>
                            <p>{todo.title} {todo.created}</p>
                            <p>{todo.read_by.includes(props.userDetails.id) ? 'yes' : 'no' }</p>
                            <p></p>
                        </div>
                    ))}
                    <h4>past</h4>
                    {todo.map(todo => (
                        <div 
                            className='notification-list'
                            key ={todo.id}>
                            <p>{todo.title}</p> 
                            <p>{todo.created.toLocaleString().split('T')[0]}</p>
                            <p></p>
                        </div>
                    ))}
                </div>
                : ''
            }
            <img
                onClick={() => notificationOpen === 0 ? NotificationOpen() : NotificationClose()} 
                className="reminder-icon" 
                src={reminder} 
                alt="reminder" />
            <p className="notification-number">{notificationCount()}</p> 
        </div>
    )
}
