import React from 'react';
import Sidenav from '../components/sidenav/Sidenav'
import Post from './Post'
import { 
        ElectionCountdown, 
        CampaignCallsMade, 
        CampaignInfo,
        CandidateCallList,
        CandidateTodo,
        CampaignStaff} from '../components/campaign/CampaignInfo';

const Home = (props) => {
    const [homeState, setHomeState] = React.useState({
        openComponent: 'home',
        updateState: ''
    })
    const callsMadeRef = React.useRef();

    const setComponent = (e) => {
       setHomeState({...homeState, openComponent: e.target.name})
    }
    const updateState = () => {
        callsMadeRef.current.updateState()
    }
    return (
        <div className="main-container">
            {homeState.updateState}
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                    <Sidenav 
                        setPlanner={setComponent}
                        />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7 col-lg-7">
                    {homeState.openComponent === 'home' ? 
                    <div>
                        <Post
                            updateState={updateState.bind(this)}
                            userDetails={props.userDetails}/>
                        <CampaignInfo userDetails={props.userDetails} />
                        <hr className="hr" />
                        <CampaignStaff />
                        <hr className="hr" />
                        <CampaignCallsMade
                            ref={callsMadeRef}
                            userDetails={props.userDetails} />
                        <hr className="hr" />
                        <CandidateTodo userDetails={props.userDetails}/>
                    </div> : ''}
                    {homeState.openComponent === 'outreach' ? 
                        <CampaignCallsMade 
                            update={homeState.updateState}/> : ''}
                    {homeState.openComponent === 'campaign info' ? 
                        <div className="col-xs-12 col-sm-8 col-md-7 col-lg-7">
                            <CampaignInfo />
                            <CampaignStaff />
                        </div>: ''}
                    {homeState.openComponent === 'candidate todo list' ? 
                        <CandidateTodo />
                    : ''}
                    {homeState.openComponent === 'candidate call list' ? 
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
export default Home