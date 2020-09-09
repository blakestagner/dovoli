import React from 'react';
import './home.css';
import graphic from './img/pencil_sideways.jpg';
import { isAuthenticated } from '../autho/Repository';
import { Redirect } from 'react-router-dom';
import Register from '../register/Register'
import alarm from './img/alarm.png'
import notes from './img/notes.png'
import share from './img/share.png'
import footerPencil from './img/footer.png'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        }
    componentDidMount() {
        if( isAuthenticated() )
        this.props.history.push("/home")
        else {}
    }
    handleSuccessfulAuth() {
        window.location.reload(false)
    }

    render() {
        return (
            <div className="home">
                <div className="landing">
                    <hr className="landing-hr" />
                    <div className="row">
                        <h1>For k-6</h1>
                        <hr className="hr-text vueeduDarkBlue2" />
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <img className="landing-icon" src={alarm} alt="alarm" />
                            <h2>Keep track of the day</h2>
                            Use the power of music to set timers & alarms to alert your students when its time for a new activity. 
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <img className="landing-icon" src={notes} alt="alarm" />
                            <h2>Plan Effectivly</h2>
                            <p>Now with vueedu you can plan your days more effectivly. Write down your plans and get reminded to reflect back at what you were thinking. </p>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <img className="landing-icon" src={share} alt="alarm" />
                            <h2>Share Lesson Plans</h2>
                            <p>Do you have a great lesson plan or an idea for one? Share with your colleagues, colaberate, and grow your great idea with other educators.</p>
                        </div>
                    </div>
                    <hr className="landing-hr" />
                    <div className="row">
                        <h1>For Higher Education</h1>
                        <hr className="hr-text vueeduDarkBlue2" />
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <img className="landing-icon" src={notes} alt="alarm" />
                            <h2>Program Mpas</h2>
                            <p>Details</p> 
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <img className="landing-icon" src={notes} alt="alarm" />
                            <h2>Meaningfull Program Details</h2>
                            <p>Details</p>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <img className="landing-icon" src={share} alt="alarm" />
                            <h2>Powerful program API</h2>
                            <p>Edit once for a Single source of truth for all program infomraiton throughout your College website.</p>
                        </div>
                    </div>
                    <hr className="landing-hr" />
                    </div>
                <div className="footer-pencil">
                </div>
            </div>
        )
    }
}