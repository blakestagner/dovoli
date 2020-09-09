import React from 'react';
import sidenav from './sidenav.css';
import SettingsSideNav from './SettingSideNav'
import IdeaSideNav from './IdeaSideNav'
import PlannerSideNav from './PlannerSideNav' 
import Planner from '../planner/Planner';

export default class Sidenav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayComponent: ''
        }
    }
    componentDidMount() {
        console.log(this.props.component)
    }
    render() {
        return (
            <div className="side-nav">
                <h2>{this.props.component}</h2>
                {this.props.component === "Idea" 
                ? <IdeaSideNav /> : ''}
                {this.props.component === "Planner" 
                ? <PlannerSideNav currentComponent={this.props.setComponent}/> : ''}
                {this.props.component === "Settings" 
                ? <SettingsSideNav /> : ''}
            </div>
        )
    }
}