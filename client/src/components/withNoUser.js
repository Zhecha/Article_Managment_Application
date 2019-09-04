import React from 'react';
import {token} from './Token';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as route from '../constants/routes';

export default function withNoUser(AuthComponent){

    class withNoUserRedux extends React.Component {

        constructor(props){
            super(props);
            this.unmounted = false;

        }
        
        componentDidMount() {
            if(!this.props.user){
                token.logout();
                this.props.history.push(route.SIGN_IN);
            } else {
                this.unmounted = false;
            }
        }

        componentWillUnmount() {
            this.unmounted = true;
        }

        render() {
            if(!this.unmounted) {
                return (
                    <AuthComponent history={this.props.history} {...this.props}/>
                )
            }
            else {
                return null
            }
        }
    }

    const mapStateToProps = (state) => {
        return {
           user: state.app.user
        }
    };
      
    const mapDispatchToProps = () => {
        return {
            
        }
    };
      
    return connect(mapStateToProps, mapDispatchToProps)(withRouter(withNoUserRedux));

}
