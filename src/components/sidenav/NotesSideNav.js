import React from 'react';
import sidenav from './sidenav.css';

export default class NotesSideNav extends React.Component {
    render() {
        return (
        <div className="side-nav">
            <h2>Notes</h2>
            <ul>
                <li>
                    <a 
                        name="my notes"
                        onClick={this.props.setPlanner}>
                        my notes
                    </a>
                </li>
                <li>
                    <a 
                        name="reminders" 
                        onClick={this.props.setPlanner}>
                        reminders
                    </a>
                </li>
                <li>
                    <a 
                        name="categories" 
                        onClick={this.props.setPlanner}>
                        categories
                    </a>
                </li>
            </ul>
        </div>
        )
    }
}