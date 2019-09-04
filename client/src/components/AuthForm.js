import React from 'react';
import withUser from './withUser';
import {signInOrSignUp, updateFields} from '../redux/actions/AuthActions';
import { connect } from 'react-redux';
import * as route from '../constants/routes';

class AuthForm extends React.Component {

    constructor(props){
        super(props);
        this.handleSignInSignUp = this.handleSignInSignUp.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }

    handleFields(event) {
        this.props.updateFields(event.target.name, event.target.value);
    }

    async handleSignInSignUp(event){
        event.preventDefault();

        const obj = {
            login: this.props.login,
            email: this.props.email,
            password: this.props.password
        }

        const url = this.props.getUrl();
        try {
            await this.props.signInOrSignUp(url, obj);
            this.props.history.push(route.ARTICLE_LIST);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    render(){

        const isError = !!this.props.error.message;
        const viewError = isError ? <h6 style={{color: 'red'}}>{this.props.error.message}</h6> : null;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">{this.props.titleAuth}</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <label htmlFor="inputLogin">Login</label>
                                        <input type="login" id="inputLogin" className="form-control" placeholder="Login" name="login" value={this.props.login} onChange={this.handleFields} required autoFocus/>
                                    </div>
                                    <br/>
    
                                    <div className="form-label-group">
                                        <label htmlFor="inputEmail">Email address</label>
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" value={this.props.email} onChange={this.handleFields} required autoFocus/>
                                    </div>
                                    <br/>
    
                                    <div className="form-label-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={this.props.password} onChange={this.handleFields} required/>
                                    </div>
                                    <br/>
                                    {viewError}
                                    <hr className="my-4"></hr>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.props.isActive ? this.props.handleSignUp : this.handleSignInSignUp}>{this.props.buttonNameSignUp}</button>
                                    <br/>
                                    {this.props.isActive && <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.handleSignInSignUp}>{this.props.buttonNameSignIn}</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        login: state.user.login,
        email: state.user.email,
        password: state.user.password,
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
       
        signInOrSignUp: (url, obj) => dispatch(signInOrSignUp(url, obj)),
        updateFields: (field, value) => dispatch(updateFields(field, value)),
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withUser(AuthForm));