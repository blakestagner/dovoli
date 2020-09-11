import React from 'react';
import sidenav from './sidenav.css';

export default class SideNav extends React.Component {
    render() {
        return (
        <div className="side-nav">
            <h2>Campaign Overview</h2>
            <ul>
                <li>
                    <a 
                        name="home"
                        onClick={this.props.setPlanner}>
                        Home
                    </a>
                </li>
                <li>
                    <a 
                        name="outreach" 
                        onClick={this.props.setPlanner}>
                        Voter Outreach
                    </a>
                </li>
                <li>
                    <a 
                        
                        name="campaign info" 
                        onClick={this.props.setPlanner}>
                        Campaign Information
                    </a>
                </li>
                
                <li>
                    <a 
                        name="candidate call list" 
                        onClick={this.props.setPlanner}>
                        Candidate Call List
                    </a>
                </li>
            </ul>
        </div>
        )
    }
}