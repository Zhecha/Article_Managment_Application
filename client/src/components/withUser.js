import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as route from '../constants/routes';

export default function withUser(AuthComponent){

    class withUserRedux extends React.Component {

        constructor(props){
            super(props);
            this.unmounted = false;

        }
        
        componentDidMount() {
            if(this.props.user){
                this.unmounted = true;
                this.props.history.push(route.ARTICLE_LIST);
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
      
    return connect(mapStateToProps, mapDispatchToProps)(withRouter(withUserRedux));

}
