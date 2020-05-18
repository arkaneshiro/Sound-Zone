import React from 'react';
import { connect } from "react-redux";
import styles from '../styles/Home.module.css';

const Home = ({currentUserId}) => {
    return (
        <div className={styles.homePageContainer}>
            <h1>~ Welcome To Soundzone ~</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(Home);
