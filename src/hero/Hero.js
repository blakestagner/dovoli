import React from 'react';
import './hero.css';
import { isAuthenticated} from '../autho/Repository';

export default class Hero extends React.Component {
    render() {
    return (
        <div className="heroContainer">
            {
                (isAuthenticated() ) ? 
                    null
                        :
                    (<LandingHero />)
            }
        </div>
        )
    }
}

class LandingHero extends React.Component {
    render() {
        return (
            <div className="heroImg">
                <div className="heroText">

                </div>
            </div>
        )
    }
}
class LoggedinHero extends React.Component {
    render() {
        return (
            <div className="loggedinImg">
                <div className="heroText">

                </div>
            </div>
        )
    }
}