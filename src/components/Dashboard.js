import React from 'react';
import { connect } from "react-redux";

const Dashboard = ({currentUserId}) => {
    console.log(currentUserId)
    return (
        <h1>Dashboard</h1>
    )
}

const mapStateToProps = (state) => {
    return {
      currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(Dashboard);
