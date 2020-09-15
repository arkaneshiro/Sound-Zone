import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { login, clearLoginError } from '../../actions/authActions';
import styles from '../../styles/LoginForm.module.css';
import Home from "../Home";
import LabelButton from "../utils/LabelButton";

const LoginForm = ({ login, loginError = [], clearLoginError }) => {
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        clearLoginError()
    }, [clearLoginError])

    const formSubmitter = data => {
        login(data.username, data.password)
    }

    const loginGuest = () => {
        login('Guest', 'guestPassword')
    }

    return (
        <>
            <div className={styles.formContainer}>

                <form className={styles.form} onSubmit={handleSubmit(formSubmitter)}>
                    <h1 className={styles.title}>Sign In</h1>
                    <input
                        className={styles.usernameInput}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        autoComplete="off"
                        ref={register({ required: true })}
                    />
                    {errors.username && <div className={styles.error1}>username required</div>}
                    <input
                        className={styles.passwordInput}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        ref={register({ required: true })}
                    />
                    {loginError.length !== 0
                    ?
                        <div className={styles.error}>{`${loginError[0]}`}</div>
                    :
                        ""
                    }
                    {errors.password && <div className={styles.error2}>password required</div>}
                    <LabelButton labelfor='submit-login' innerhtml='Sign In'/>
                    <input
                        className={styles.submitInput}
                        type="submit"
                        id='submit-login'
                        value="Sign In"
                    />
                    <LabelButton labelfor='submit-login-guest' innerhtml='Sign In as Guest'/>
                    <input
                        className={styles.submitInput}
                        onClick={loginGuest}
                        type="button"
                        id='submit-login-guest'
                        value="Sign In as Guest"
                    />
                </form>

            </div>
            <Home/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      loginError: state.auth.loginError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password)),
        clearLoginError: () => dispatch(clearLoginError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
