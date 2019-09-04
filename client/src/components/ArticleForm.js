import React from 'react'
import Header from './Header';
import * as func from '../functions/functions';
import {token} from './Token';
import withNoUser from './withNoUser';
import { connect } from 'react-redux';
import {createOrEditArticle,changeProperty, viewErrors} from '../redux/actions/ArticleActions';
import * as route from '../constants/routes';

class ArticleForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleActionArticle = this.handleActionArticle.bind(this);
        this.handleChoosePropertyArticle = this.handleChoosePropertyArticle.bind(this);
    }

    handleChoosePropertyArticle(event){
        this.props.changeProperty(event.target.name);
    }

    async handleActionArticle(){
        try {
            const gettedToken = token.getToken();
            const obj = this.props.getData();
            if(this.props.property || this.props.isEdit){
                await this.props.createOrEditArticle(obj.url,gettedToken,obj.article);
                if(this.props.location.search.length){ 
                    const query = func.queryParse(this.props.location.search);
                    if(!query.page){
                        if(!query.limit) {
                            this.props.history.push(route.pageArticleRouteSort(query.sort, query.by))
                        } else {
                            if(!query.sort) {
                                this.props.history.push(route.pageArticleRouteLimit(query.limit))
                            } else {
                                this.props.history.push(route.pageArticleLimitRouteWithSort(query.limit, query.sort, query.by))
                            }
                        }
                    } else {
                        if(!query.sort) {
                            this.props.history.push(route.pageArticleRoute(query.page,query.limit))
                        } else {
                            this.props.history.push(route.pageArticleRouteWithSort(query.page, query.limit, query.sort, query.by))
                        }
                    } 
                } else {
                    this.props.history.push(route.ARTICLE_LIST);
                } 
            } else {
                this.props.viewErrors("Choose article property")
            }
        } catch (error) {
            if(error.isInvalidToken){
                token.logout();
                this.props.history.push(route.SIGN_IN);
            } else {
                console.log(error);
            }
        }
    }

    render(){
        
        let isDisabledPrivate = false, isDisabledPublic = false;
        if(this.props.property === 'private'){
            isDisabledPrivate = true;
            isDisabledPublic = false;
        } else if (this.props.property === 'public') {
            isDisabledPrivate = false;
            isDisabledPublic = true;
        }

        const isError = !!this.props.err;
        const viewError = isError ? <h6 style={{color: 'red'}}>{this.props.err}</h6> : null;

        return (
            <div>
                <Header/>
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">{this.props.header}</h5>
                        <form className="form-signin">
                            <div className="form-label-group">
                                <label htmlFor="inputTitle">Title</label>
                                <input type="text" id="inputTitle" className="form-control" placeholder="Title" name="title" value={this.props.title || ''} onChange={this.props.handleFields} required autoFocus/>
                            </div>
                            <br/>
    
                            <div className="form-label-group">
                                <label htmlFor="inputBody">Body</label>
                                <input type="text" id="inputBody" className="form-control" placeholder="Body" name="body" value={this.props.body || ''} onChange={this.props.handleFields} required autoFocus/>
                            </div>
                            <br/>
                            {viewError}
                            <hr className="my-4"></hr>
                            {this.props.isEdit ? <button className="btn btn-lg btn-outline-success btn-block text-uppercase" type="button" onClick={this.handleActionArticle} disabled={this.props.isDisabled}>Edit</button> :
                                <div className="form-label-group">
                                    <button className="btn btn-lg btn-outline-success btn-block text-uppercase" type="button" onClick={this.handleActionArticle} >Create</button>
                                    <button className="btn btn-outline-info" type="button" name="private" onClick={this.handleChoosePropertyArticle} style={{width:'50%', float:'left', marginTop:'20px'}} disabled={isDisabledPrivate}>Private</button>
                                    <button className="btn btn-outline-dark" type="button" name="public" onClick={this.handleChoosePropertyArticle} style={{width:'50%', float:'right', marginTop:'20px'}} disabled={isDisabledPublic}>Public</button>
                                </div>    }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.page.page,
        err: state.article.message,
        property: state.article.property
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        createOrEditArticle: (url, token, article) => dispatch(createOrEditArticle(url, token, article)),
        changeProperty: (property) => dispatch(changeProperty(property)),
        viewErrors: (message) => dispatch(viewErrors(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(ArticleForm));