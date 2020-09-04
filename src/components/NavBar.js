import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from 'react-dropdown-select';

import styles from '../styles/NavBar.module.css';
import { logout } from '../actions/authActions';


const NavBar = ({searchData, currentUserId, logouter}) => {

    const searchStyles = {
        width: '200px',
        margin: '0px 5px',
        borderColor: 'white',
        backgroundColor: 'white',
    }

    const selector = val => {
        window.location.href = `/users/${val[0].id}`
    }


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
                        labelField="username"
                        valueField="id"
                        searchBy="username"
                        placeholder="search for a user"
                        dropdownHandle={false}
                        searchable={true}
                        clearOnBlur={true}
                        options={searchData}
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
        searchData: state.user.searchData,
        currentUserId: state.auth.currentUserId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
