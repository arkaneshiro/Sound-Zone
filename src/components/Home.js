import React from 'react';
import { connect } from "react-redux";

const Home = ({currentUserId}) => {
    return (
        <h1>Home</h1>
    )
}

const mapStateToProps = (state) => {
    return {
      currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(Home);
