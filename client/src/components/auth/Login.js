// We import a bunch of dependencies
import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';
// Some action-creators we are going to write later
import * as authActionCreators from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends PureComponent {
    login () {
        // dispatch action to the redux-saga
        this.props.authActions.loginUser(this.props.location.query.next || '/');
    }

    render () {
        return (
            <div className="auth">
                <div className="auth-structure">
                    <div className="auth-right-side">
                        <span>Login</span><Link to="/auth/signup" className="btn btn-info">Signup</Link>
                    </div>
                    <div className="auth-panel">
                        <div className="auth-form">
                            <form>
                                <div className="auth-form-group">
                                    <label htmlFor="name">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        component="input"
                                        placeholder="Enter the name"
                                    />
                                </div>
                                <div className="auth-form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        component="input"
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter the password"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-submit"
                                    onClick={() => this.login()}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// Bind the action-creators so that we can call them as props
function mapDispatchToProps (dispatch) {
    return {
        authActions: bindActionCreators(authActionCreators, dispatch)
    };
}
// Wrap the login into a reduxForm HOC
export default reduxForm({ form: 'login' })(connect(null, mapDispatchToProps)(Login));