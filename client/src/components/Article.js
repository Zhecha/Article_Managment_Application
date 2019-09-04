import React from 'react';
import * as route from '../constants/routes';
import withNoUser from './withNoUser';
import { connect } from 'react-redux';
import {updateShow} from '../redux/actions/ArticleActions';
import * as func from '../functions/functions';

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.handleEditArticle = this.handleEditArticle.bind(this);
        this.handleViewArticle = this.handleViewArticle.bind(this);
        this.handleCommentArticle = this.handleCommentArticle.bind(this);
    }

    handleCommentArticle() {
        if(!this.props.location.search.length) {
            this.props.history.push(route.commentArticleRoute(this.props.id));
        } else {
            const query = func.queryParse(this.props.location.search);
            if(!query.page){
                if(!query.limit) {
                    this.props.history.push(route.commentArticleRouteWithSort(this.props.id, query.sort, query.by))
                } else {
                    if(!query.sort) {
                        this.props.history.push(route.commentArticleLimitRoute(this.props.id, query.limit))
                    } else {
                        this.props.history.push(route.commentArticleLimitRouteWithSort(this.props.id, query.limit, query.sort, query.by))
                    }
                }
            } else {
                if(!query.sort) {
                    this.props.history.push(route.commentArticleRouteWithPage(this.props.id, query.page, query.limit))
                } else {
                    this.props.history.push(route.commentArticleRouteWithPageWithSort(this.props.id, query.page, query.limit, query.sort, query.by))
                }
            }
        }
    }

    handleEditArticle() {
        if(!this.props.location.search.length){
            const editRoute = route.editArticleRouteWithoutLimitPage(this.props.id);
            this.props.history.push(editRoute);
        } else {
            const query = func.queryParse(this.props.location.search);
            if(!query.page){
                if(!query.limit){
                    this.props.history.push(route.editArticleRouteWithoutLimitPageWithSort(this.props.id, query.sort, query.by))
                } else {
                    if(!query.sort) {
                        const editRoute = route.editArticleLimitRoute(this.props.id,this.props.page.perPage)
                        this.props.history.push(editRoute);
                    } else {
                        this.props.history.push(route.editArticleLimitRouteWithSort(this.props.id, this.props.page.perPage, query.sort, query.by))
                    }
                }
            } else {
                if(!query.sort){
                    const editRoute = route.editArticleRoute(this.props.id,this.props.page.currentPage, this.props.page.perPage);
                    this.props.history.push(editRoute);   
                } else {
                    this.props.history.push(route.editArticleRouteWithSort(this.props.id, this.props.page.currentPage, this.props.page.perPage, query.sort, query.by))
                }    
            }
        }
    }

    handleViewArticle() {
        if(!this.props.location.search.length){
            const viewRoute = route.viewArticleLimitRoute(this.props.id);
            this.props.history.push(viewRoute);
            this.props.updateShow(true);
        } else {
            const query = func.queryParse(this.props.location.search);
            if(!query.page){
                if(!query.limit) {
                    this.props.history.push(route.viewArticleLimitRouteWithSort(this.props.id,query.sort, query.by))
                    this.props.updateShow(true);
                } else {
                    if(!query.sort) {
                        const viewRoute = route.viewArticleWithoutPage(this.props.id,query.limit);
                        this.props.history.push(viewRoute);
                        this.props.updateShow(true);
                    } else {
                        this.props.history.push(route.viewArticleWithoutPageWithSort(this.props.id,query.limit, query.sort, query.by))
                        this.props.updateShow(true);
                    }
                }
            } else {
                if(!query.sort) {
                    const viewRoute = route.viewArticleRoute(this.props.id,this.props.page.currentPage,this.props.page.perPage);
                    this.props.history.push(viewRoute);
                    this.props.updateShow(true);
                } else {
                    this.props.history.push(route.viewArticleRouteWithSort(this.props.id, this.props.page.currentPage, this.props.page.perPage, query.sort, query.by))
                    this.props.updateShow(true)
                }
            }
        }
    }
    
    render() {

        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button" disabled>{this.props.index}</button>
                </div>
                <span type="text" className="form-control"  aria-describedby="button-addon4"  onClick={this.handleCommentArticle}>{this.props.title}</span>
                <span type="text" className="form-control"  aria-describedby="button-addon5"  onClick={this.handleCommentArticle}>{this.props.body}</span>
                <span type="text" className="form-control"  aria-describedby="button-addon6"  onClick={this.handleCommentArticle}>{this.props.dateupdated}</span>
                {
                    this.props.isEdit ?  <div className="input-group-append" id="button-addon4">
                                            <button className="btn btn-outline-primary" type="button" onClick={this.handleEditArticle}>Edit</button>
                                            <button className="btn btn-outline-info" type="button" onClick={this.handleViewArticle}>View</button>
                                    </div> 
                            :       <div className="input-group-append" id="button-addon4">
                                        <button className="btn btn-outline-info" type="button" onClick={this.handleViewArticle}>View</button>
                                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       page: state.page.page,
       
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        updateShow: (isShow) => dispatch(updateShow(isShow))
    }
};

  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(Article));