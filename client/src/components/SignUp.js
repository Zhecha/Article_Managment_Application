import React from 'react';
import { connect } from 'react-redux';
import * as urls from '../constants/urls';
import withUser from './withUser';
import AuthForm from './AuthForm';

class SignUp extends React.Component {
    
    constructor(props){
        super(props);
        this.getUrl = this.getUrl.bind(this);
    }

    getUrl() {
        return urls.URL_SIGN_UP
    }

    render() {
        
        return (
            <AuthForm titleAuth="Sign Up" buttonNameSignUp="SignUp" 
                            isActive={false} getUrl={this.getUrl}/>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(withUser(SignUp));