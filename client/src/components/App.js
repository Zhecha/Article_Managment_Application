import React from 'react';
import Authentication from './Authentication';
import SignUp from './SignUp';
import {Route,Switch,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {checkAuth, init} from '../redux/actions/AppActions';
import {token} from './Token';
import { withRouter } from "react-router";
import * as route from '../constants/routes';
import ArticleList from './ArticleList';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import ArticleComments from './ArticleComments';

class App extends React.Component {

    async componentDidMount() {
        if(token.getToken()){
            try {
                await this.props.checkAuth(token.getToken());
                this.props.init(true);
                const genreRoute =  this.props.location.search.length ? this.props.location.pathname + this.props.location.search : this.props.location.pathname;
                this.props.history.push(genreRoute);
            } catch (error) {
                this.props.init(true);
                this.props.history.push(route.SIGN_IN);
            }
        } else {
            this.props.init(true);
            this.props.history.push(route.SIGN_UP);
        }
    }

    render() {
        if(this.props.inited) {
            return (
                <div>
                    <Switch>
                        <Route exact path={route.ARTICLE_LIST} component={ArticleList}/>
                        <Route path={route.CREATE_ARTICLE} component={CreateArticle}/>
                        <Route path={route.SIGN_IN} component={Authentication}/>
                        <Route path={route.SIGN_UP} component={SignUp}/>
                        <Route path={route.EDIT_ARTICLE} component={EditArticle}/>
                        <Route path={route.ARTICLE_COMMENTS} component={ArticleComments}/>
                        <Redirect from='/' to={route.ARTICLE_LIST}/>
                    </Switch>
                </div>
            )
        } else {
            return (
                <h1>Loading...</h1>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        inited: state.app.inited
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: (token) => dispatch(checkAuth(token)),
        init:(inited) => dispatch(init(inited))
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
