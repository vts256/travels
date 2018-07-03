import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import PropTypes from 'prop-types';
import styles from './AuthModal.css';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            component: 'SignIn'
        };

        this.facebookResponse = this.facebookResponse.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.baseComponent = this.baseComponent.bind(this);
    }

    facebookResponse (resp) {
        console.log(resp);
        this.props.onSignIn();
    }

    onLogIn() {
        console.log('Log in');
    }

    onSignUp() {
        console.log('Sign Up');
    }
  
    renderComponent(component) {
        this.setState({
            component
        });
    }

    baseComponent() {
        return (
            <div>
                <FacebookLogin appId='1817436878556969'
                autoLoad={false} fields='name,email'
                cssClass={styles.fb__button} callback={this.facebookResponse}
                textButton='Facebook' />
                <div className={styles.lines}>
                    <span>or</span>
                </div>
                <div className={styles.log__in}><a onClick={() => this.renderComponent('LogIn')}>Log In</a></div>
                <div className={styles.sign__up}>First time travel? <a onClick={() => this.renderComponent('SignUp')}>Sign Up</a></div>
            </div>);
    }

    getComponent() {
        console.log(this.state.component);
        switch(this.state.component) {
            case 'LogIn':
                return <LogIn onBack={() => this.renderComponent('SignIn')} onLogIn={this.onLogIn}/>;
            case 'SignUp':
                return <SignUp onBack={() => this.renderComponent('SignIn')} onSignUp={this.onSignUp}/>;
            default:
                return this.baseComponent();
        }
    }

    render() {
        return (<div>
            {this.getComponent()}
            </div>);
    }
}

SignIn.propTypes = {
    onSignIn: PropTypes.func.isRequired 
};