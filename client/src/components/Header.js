import React from 'react';
import {token} from './Token';
import * as route from '../constants/routes';
import withNoUser from './withNoUser';
import {deleteUser} from '../redux/actions/AppActions';
import { connect } from 'react-redux';
 
class Header extends React.Component {
    
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    

    handleLogout(){
        token.logout();
        this.props.deleteUser();
        this.props.history.push(route.SIGN_IN);
    }
    

    render() {

        const email = this.props.user ? this.props.user.email : '';
        const login = this.props.user ? this.props.user.login : '';

        return (
            <div className="card card-signin my-5">
                <div className="card-body">
                    <button type="button" className="btn btn-outline-dark" onClick={this.handleLogout}>LOGOUT</button>
                    <br/>
                    <input className="btn btn-outline-secondary" type="text" value={email} disabled/>
                    <br/>
                    <input className="btn btn-outline-secondary" type="text" value={login} disabled/>
                    <br/>
                    <br/>
                    <h5 className="card-title text-center">ARTICLELIST</h5>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
       user: state.app.user
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: () => dispatch(deleteUser()),
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(Header));