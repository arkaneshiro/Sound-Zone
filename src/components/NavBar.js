import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import styles from '../styles/NavBar.module.css';
import { logout } from '../actions/authActions';


const NavBar = ({searchData, currentUserId, intervalKiller, currentSoundInfo, logouter}) => {
    const { handleSubmit, register, watch } = useForm();
    const [displaySearch, setDisplaySearch] = useState(false);


    // search functions
    const onSearch = (data, e) => {
        console.log(watch('searchResults'))
        e.target.reset()
    }

    const changer = () => {
        console.log('change')
    }

    const openResults = () => {
        setDisplaySearch(true)
    }


    // filters search results based off of what you type in input
    const searchResults = searchData ?
            searchData.map((user) => {
                if (watch('search')) {
                    if (user.username.toLowerCase().includes(watch('search').toLowerCase())) {
                        if (user.id !== parseInt(currentUserId)) {
                            return (
                                <option value={user.id} key={user.id}>
                                    {user.username}
                                </option>
                                )
                        } else {
                            return ""
                        }
                    } else {
                        return ""
                    }
                } else {
                    return ""
                }
            }
        )
        :
        ""


    // changes what nav is displaye based on if ur logged in
    const nav = currentUserId ? (
            <div className={styles.navBar}>
                <div className={styles.linkContainer}>
                    <NavLink className={styles.navBarLink} to={`/dashboard`}>Dashboard</NavLink>
                    <NavLink className={styles.navBarLink} to={`/users/${currentUserId}`}>Profile</NavLink>
                    <NavLink className={styles.navBarLink} to={`/upload`}>Upload</NavLink>
                    <span className={styles.navBarLink} onClick={logouter} >Log Out</span>
                    <form onSubmit={handleSubmit(onSearch)}>
                        <input
                            className={styles.searchBar}
                            type="search"
                            id="search"
                            name="search"
                            placeholder="search for a user"
                            autoComplete="off"
                            onFocus={openResults}

                            ref={register()}
                        />
                        <select
                            name={styles.searchResults}
                            hidden={!displaySearch}
                            className="searchResultsContainer"
                            ref={register()}
                            onChange={changer}
                        >
                            {searchResults}
                        </select>
                    </form>
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
