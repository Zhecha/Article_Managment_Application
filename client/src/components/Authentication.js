import React from 'react';
import { connect } from 'react-redux';
import * as urls from '../constants/urls';
import * as route from '../constants/routes';
import withUser from './withUser';
import AuthForm from './AuthForm'

class Authentication extends React.Component {
    constructor(props){
        super(props);
        this.getUrl = this.getUrl.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp() {
        this.props.history.push(route.SIGN_UP);
        window.location.reload()
    }

    getUrl() {
        return urls.URL_SIGN_IN
    }

    render() {

        return (
            <AuthForm titleAuth="Sign In/Sign Up" handleSignUp={this.handleSignUp} buttonNameSignUp="SignUp" buttonNameSignIn="SignIn"
                                        isActive={true} getUrl={this.getUrl}/>
        )
    }
}

const mapStateToProps = () => {
    return {
        
    }
};
  
const mapDispatchToProps = () => {
    return {
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withUser(Authentication));