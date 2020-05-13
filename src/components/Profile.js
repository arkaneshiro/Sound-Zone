import React from 'react';
import { connect } from "react-redux";

const Profile = ({currentUserId}) => {
    return (
        <h1>Profile</h1>
    )
}

const mapStateToProps = (state) => {
    return {
      currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(Profile);
