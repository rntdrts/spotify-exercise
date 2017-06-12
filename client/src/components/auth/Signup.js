import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';
import * as authActionCreators from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Signup extends PureComponent {
    // signupUser dispatches SIGNUP_USER to be intercepted by a redux-saga
    register () {
        this.props.authActions.signupUser();
    }

    render () {
        return (
            <div className="auth">
                <div className="auth-structure">
                    <div className="auth-right-side">
                        <span>Signup</span><Link to="/auth/login" className="btn btn-info">Login</Link>
                    </div>
                    <div className="auth-panel">
                        <div className="auth-form">
                            <form onSubmit={this.props.handleSubmit}>
                                <div className="auth-form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        component="input"
                                        placeholder="Enter the e-mail"
                                    />
                                </div>
                                <div className="auth-form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
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
                                    onClick={() => this.register()}
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// Bint the action-creators to be used as props
function mapDispatchToProps (dispatch) {
    return {
        authActions: bindActionCreators(authActionCreators, dispatch)
    };
}
// redux-form HOC to wrap the component
export default reduxForm({ form: 'signup' })(connect(null, mapDispatchToProps)(Signup));
