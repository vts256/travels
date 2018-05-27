import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import DialogContent from '@material-ui/core/DialogContent';
import LogIn from './LogIn.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import styles from './SignInModal.css';


export default class SignInModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: 'SignIn'
        };

        this.logInComponent = this.logInComponent.bind(this);
        this.signUpComponent = this.signUpComponent.bind(this);
        this.baseComponent = this.baseComponent.bind(this);
    }

    logInComponent(componentName) {
        this.setState({
            component: 'LogIn'
        });
    }

    signUpComponent(componentName) {
        this.setState({
            component: 'SignUp'
        });
    }

    baseComponent() {
        this.setState({
            component: 'SignIn'
        });
    }
  
    transition(props) {
        return <Fade {...props} />;
    }

    componentWillMount() {
        console.log('unmount');
        this.baseComponent();
    }

    getComponent() {
        switch(this.state.component) {
            case 'LogIn':
                return <LogIn baseComponent={this.baseComponent}/>;
            case 'SignUp':
                return <SignUp baseComponent={this.baseComponent}/>;
            default:
                return <SignIn logInComponent={this.logInComponent} signUpComponent={this.signUpComponent}/>;
        }
    }

    render() {
        return (
            <Dialog
            open={this.props.open}
            TransitionComponent={this.transition}
            keepMounted
            onClose={this.props.handleClose}>
            <DialogTitle>
                <div className={styles.dialog__title}>Continue with</div>
            </DialogTitle>
            <DialogContent>
                {this.getComponent()}
            </DialogContent>
          </Dialog>
        );
    }
}

SignInModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};