import React from 'react';
import MyPlans from '../components/planner/MyPlans';
import PlannerSideNav from '../components/sidenav/PlannerSideNav';
import AddToPlanner from '../components/planner/AddToPlanner';
import PlannerDateView from '../components/planner/PlannerDateView';
import home from './home.css';
import PlannerDate from '../components/planner/PlannerDate'
import Planner from '../components/planner/Planner'

export default class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            openComponent: 'my planner'
        }
        this.setComponent = this.setComponent.bind(this)
    }
    setComponent(e) {
        this.setState({openComponent: e.target.name})
    }
    render() {
        return (
            <div className="main-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                        <PlannerSideNav 
                            setPlanner={this.setComponent}
                            />
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-7 col-lg-7">
                        {this.state.openComponent === 'my planner' ? 
                        <div>
                            <AddToPlanner
                                userDetails={this.props.userDetails}/>
                            <Planner 
                                date={'1999'}
                                userDetails={this.props.userDetails} />
                        </div> 
                        : ''}
                        {this.state.openComponent === 'planner date view' ? 
                            <PlannerDateView
                                userDetails={this.props.userDetails}/>: ''}
                        {this.state.openComponent === 'planner date' ? 
                            <PlannerDate
                                
                                userDetails={this.props.userDetails}/>: ''}
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-2 col-lg-2">
                        <div className="right-nav">
                            RIGHT NAV
                        </div>
                    </div >
                </div>
            </div>
        )
    }
}