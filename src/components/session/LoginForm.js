import React from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { login } from '../../actions/authActions';
import styles from '../../styles/LoginForm.module.css';

import LabelButton from "../utils/LabelButton";

const LoginForm = ({ login }) => {
    const { register, handleSubmit, errors } = useForm();

    const formSubmitter = data => {
        login(data.username, data.password)
    }

    const loginGuest = () => {
        login('Guest', 'guestPassword')
    }

    return (
        <div className={styles.formContainer}>
            <h1>Sign In</h1>
            <form className={styles.form} onSubmit={handleSubmit(formSubmitter)}>
                {/* <label className={styles.label} htmlFor="username" >Username: */}
                    <input
                        className={styles.usernameInput}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        ref={register({ required: true })}
                    />
                {/* </label> */}
                {errors.username && <div className={styles.error1}>username required</div>}
                {/* <label className={styles.label} htmlFor="password" >Password: */}
                    <input
                        className={styles.passwordInput}
                        type="text"
                        id="password"
                        name="password"
                        placeholder="password"
                        ref={register({ required: true })}
                    />
                {/* </label> */}
                {errors.password && <div className={styles.error2}>password required</div>}
                <LabelButton labelfor='submit-login' innerhtml='Sign In'/>
                <input className={styles.submitInput} type="submit" id='submit-login' value="Sign In" />
                <LabelButton labelfor='submit-login-guest' innerhtml='Sign In as Guest'/>
                <input className={styles.submitInput} onClick={loginGuest} type="button" id='submit-login-guest' value="Sign In as Guest" />
            </form>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password)),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);
