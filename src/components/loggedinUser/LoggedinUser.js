import React from 'react';
import profileImg from '../../img/icons/profile.svg'
import institutionIcon from '../../img/icons/institutionWhite.svg';
import location from '../../img/icons/location-white.svg';
import emailIcon from '../../img/icons/email.svg';
import user from './user.css'
import Avatar from './Avatar'

export default class loggedinUser extends React.Component {

    render() {
        const {id, fname, lname, email, campaign, profile_pic} = this.props.userDetails
        return (
            <div className="profile">
                <div className="card">
                    <div className="cardHeader">
                        <Avatar 
                            userData={id+fname+lname}
                            hasProfileImg={profile_pic}
                        />
                        <div className="profileName">{fname} {lname}</div>
                    </div>
                    <div className="cardMain">
                        <div className="card-row">    
                            <img className="profileIcons" src={location} alt="location" />
                            <div className="profileText">{campaign}</div>
                        </div>
                        <div className="card-row">    
                            <img className="profileIcons" src={emailIcon} alt="location" />
                            <div className="profileText">{email}</div>
                        </div>                   
                    </div>
                </div>
            </div>
        )
    }
}