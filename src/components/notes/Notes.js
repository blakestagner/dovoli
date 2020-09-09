import React from 'react';
import NotesSideNav from '../sidenav/NotesSideNav';
import AddNote from './AddNote'
import MyNotes from './MyNotes'
import PinnedNotes from './PinnedNotes'
import { getNotes } from '../../autho/Repository'
import BottomNav from '../bottomNav/BottomNav'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";


export default class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            openComponent: 0,
            myNotes: []
        }
        this.setComponent = this.setComponent.bind(this)
    }
    componentDidMount() {
        getNotes() 
        .then(res => (
            this.setState({myNotes: res})
        ))
        .catch(err => (
            console.log(err)
        ))
    }
    handleUpdate() {
        getNotes()
        .then(res => (
            this.setState({myNotes: res})
        ))
        .catch(err => (
            console.log(err)
        ))
    }
    setComponent(e) {
        this.setState({openComponent: e})
    }
    updateState() {
        this.setState({updateState: 'yes'})
    }
    render() {
        return (
            <div className="main-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                        <NotesSideNav 
                            setPlanner={this.setComponent}
                            />
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-7 col-lg-9">
                        <div>
                            <AddNote
                                updateState={this.handleUpdate.bind(this)}
                                userDetails={this.props.userDetails}
                                pinned
                                />
                                {this.state.openComponent === 0 ? 
                                <MyNotes 
                                    myNotes={this.state.myNotes}
                                    updateState={this.handleUpdate.bind(this)}
                                    date={'1999'}
                                    userDetails={this.props.userDetails}
                                />
                                :
                                <PinnedNotes
                                    myNotes={this.state.myNotes}
                                    updateState={this.handleUpdate.bind(this)}
                                    pinned={1}
                                    userDetails={this.props.userDetails}
                                />
                                }
                        </div> 
                    </div>
                </div>
                <MobileView>
                    <BottomNav changeView={this.setComponent}/>
                </MobileView>
            </div>
        )
    }
}