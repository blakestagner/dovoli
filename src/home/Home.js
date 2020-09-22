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
    const todoRef = React.useRef();

    const setComponent = (e) => {
       setHomeState({...homeState, openComponent: e.target.name})
    }
    const updateState = () => {
        callsMadeRef.current.updateState()
    }
    const updateTodoState = () => {
        todoRef.current.updateState()
    }
    
    return (
        <div className="main-container">
            {homeState.updateState}
            <div className="row">
                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                    <Sidenav 
                        setPlanner={setComponent}
                        />
                </div>
                <div className="col-xs-12 col-sm-9 col-md-9 col-lg-7">
                    {homeState.openComponent === 'home' ? 
                    <div>
                        <Post
                            updateTodo={updateTodoState.bind(this)}
                            updateState={updateState.bind(this)}
                            userDetails={props.userDetails}/>
                        <CampaignInfo userDetails={props.userDetails} />
                        <hr className="hr" />
                        <CampaignCallsMade
                            ref={callsMadeRef}
                            userDetails={props.userDetails} />
                        <hr className="hr" />
                        <CandidateTodo 
                            ref={todoRef}
                            userDetails={props.userDetails}/>
                    </div> : ''}
                    {homeState.openComponent === 'outreach' ? 
                        <CampaignCallsMade 
                            update={homeState.updateState}/> : ''}
                    {homeState.openComponent === 'campaign info' ? 
                        <div>
                            <h1>Campaign Info</h1>
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
                <div className="col-xs-0 col-sm-0 col-md-2 col-lg-2">

                </div >
            </div>
        </div>
    )
}
export default Home