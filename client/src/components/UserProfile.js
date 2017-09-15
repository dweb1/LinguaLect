import React from 'react';

const UserProfile = (props) => {
    return (
        <div>
            <p>{props.user.email}</p>
        </div>
    );
};

export default UserProfile;