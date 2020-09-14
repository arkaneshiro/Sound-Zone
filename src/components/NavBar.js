import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from 'react-dropdown-select';

import styles from '../styles/NavBar.module.css';
import { logout } from '../actions/authActions';


const NavBar = ({searchData = [], currentUserId, logouter, redirector, setSearchSelected, searchSelected, ...props}) => {

    const searchStyles = {
        width: '200px',
        margin: '0px 5px',
        borderColor: 'white',
        backgroundColor: 'white',
    }

    const selector = val => {
        if (val[0] !== undefined) {
            props.history.push(`/users/${val[0].id}`)
            setSearchSelected([val[0]])
        }
    }

    const searchMinusCurrentUser = searchData.filter(userObj => userObj.id !== parseInt(currentUserId))

    // changes what nav is displayed based on if ur logged in
    const nav = currentUserId ? (
        <div className={styles.navBar}>
                <div className={styles.linkContainer}>
                    <NavLink className={styles.navBarLink} to={`/dashboard`}>Dashboard</NavLink>
                    <NavLink className={styles.navBarLink} to={`/users/${currentUserId}`}>Profile</NavLink>
                    <NavLink className={styles.navBarLink} to={`/upload`}>Upload</NavLink>
                    <span className={styles.navBarLink} onClick={logouter} >Log Out</span>
                    <Select
                        style={searchStyles}
                        values={searchSelected}
                        labelField="username"
                        valueField="id"
                        searchBy="username"
                        placeholder="search for a user"
                        dropdownHandle={false}
                        dropdownGap={0}
                        searchable={true}
                        clearOnBlur={true}
                        options={searchMinusCurrentUser}
                        onChange={selector}
                    />
                </div>

                <div>
                    <a className={styles.navBarLink} href="https://github.com/arkaneshiro/Sound-Zone">Github</a>
                    <a className={styles.navBarLink} href="https://arkaneshiro.github.io">Portfolio</a>
                </div>
            </div>
        ) : (
            <div className={styles.navBar}>
                <div>
                    <NavLink className={styles.navBarLink} exact to="/">Home</NavLink>
                    <NavLink className={styles.navBarLink} to="/register">Sign Up</NavLink>
                    <NavLink className={styles.navBarLink} to="/login">Sign In</NavLink>
                </div>
                <div>
                    <a className={styles.navBarLink} href="https://github.com/arkaneshiro/Sound-Zone">Github</a>
                    <a className={styles.navBarLink} href="https://arkaneshiro.github.io">Portfolio</a>
                </div>
            </div>
        );


        return (
            <>
            {nav}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.currentUserId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
