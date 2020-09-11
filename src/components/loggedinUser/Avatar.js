import React from 'react';
import profileImg from '../../img/icons/profile.svg'


const Avatar = ({userData, hasProfileImg}) => {
        const avatarImg = window.location.origin + `/img/profileImg/${String(userData)}.jpg`
        return (

                <img 
                    className={hasProfileImg === 'true' ? 'profile-img' : 'default-profile-img'}
                    src={hasProfileImg === 'true' ? avatarImg : profileImg} 
                    alt={avatarImg}/>

        )
}
export default Avatar