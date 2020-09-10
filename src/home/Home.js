import React from 'react';
import AddToPlanner from '../components/planner/AddToPlanner';
import PlannerDateView from '../components/planner/PlannerDateView';
import PlannerDate from '../components/planner/PlannerDate'
import CampaignOverview from './CampaignOverview'
import Sidenav from '../components/sidenav/Sidenav'
import Post from './Post'
import { 
        ElectionCountdown, 
        CampaignCallsMade, 
        CampaignInfo,
        CandidateCallList } from '../components/campaign/CampaignInfo';

export default class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            openComponent: 'home',
            updateState: ''
        }
        this.setComponent = this.setComponent.bind(this)
    }
    setComponent(e) {
        this.setState({openComponent: e.target.name})
    }
    updateState() {
        this.setState({updateState: 'yes'})
    }
    render() {
        return (
            <div className="main-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                        <Sidenav 
                            setPlanner={this.setComponent}
                            />
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-7 col-lg-7">
                        {this.state.openComponent === 'home' ? 
                        <div>
                            <Post
                                updateState={this.updateState.bind(this)}
                                userDetails={this.props.userDetails}/>
                            <CampaignOverview 
                                userDetails={this.props.userDetails}/>
                        </div> : ''}
                        {this.state.openComponent === 'outreach' ? 
                            <CampaignCallsMade />: ''}
                        {this.state.openComponent === 'campaign info' ? 
                            <div className="col-xs-12 col-sm-8 col-md-7 col-lg-7">
                                <CampaignInfo />
                            </div>: ''}
                        {this.state.openComponent === 'candidate call list' ? 
                                <CandidateCallList />
                            : ''}
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-2 col-lg-2">
                        <div className="right-nav">
                            <ElectionCountdown />
                        </div>
                    </div >
                </div>
            </div>
        )
    }
}