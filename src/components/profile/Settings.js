import React from 'react';
import LoggedinUser from '../loggedinUser/LoggedinUser'
import { isAuthenticated } from '../../autho/Repository';
import Sidenav from '../../components/sidenav/Sidenav';


export default class Settings extends React.Component {
    constructor() {
        super();
        this.state = { };
        }

    render() {
        return  (
            <div>
                <h1>Settings</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                        <Sidenav component={'Settings'}/>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4">
                        <LoggedinUser userDetails={this.props.userDetails}/>
                    </div>
                </div>
            </div>
        )
    }
}