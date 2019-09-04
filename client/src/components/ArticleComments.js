import React from 'react';
import * as route from '../constants/routes';
import withNoUser from './withNoUser';
import { connect } from 'react-redux';
import * as func from '../functions/functions';
import Header from './Header';
import {getArticle} from '../redux/actions/ArticleActions';
import {token} from './Token';
import Masonry from 'react-masonry-component';
import {updateField, updateDisabled,createComment, getComments, updateComment} from '../redux/actions/CommentActions';
import * as urls from '../constants/urls';
import Comment from './Comment';
import io from 'socket.io-client';


class ArticleCommetns extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleCreateComment = this.handleCreateComment.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
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
    }

    async handleCreateComment() {
        try {
            const gettedToken = token.getToken();
            const comment = {
                id: this.props.match.params.id,
                text: this.props.commentText,
                creator: this.props.user.login
            }
            await this.props.createComment(urls.URL_COMMENT, gettedToken, comment);
            this.props.updateDisabled(true);
        } catch (error) {
            if(error.isInvalidToken){
                token.logout();
                this.props.history.push(route.SIGN_IN);
            } else {
                console.log(error);
            }
        }
    }

    handleChangeField(event) {
        this.props.updateDisabled(false);
        this.props.updateField(event.target.value);
    }

    async componentDidMount() {
        try {
            const socket = io(urls.URL_ROOT);
            const gettedToken = token.getToken();
            socket.emit('auth', {id: this.props.user.id})
            
            socket.on('getNewComment', (comment) => {
                if(this.props.match.params.id === comment.id_article) {
                    this.props.updateComment(comment)
                }
            })
            await this.props.getArticle(gettedToken, this.props.match.params.id);
            await this.props.getComments(urls.urlArticleComments(this.props.match.params.id), gettedToken);
            this.props.updateDisabled(true);
        } catch (error) {
            if(error.isInvalidToken){
                token.logout();
                this.props.history.push(route.SIGN_IN);
            } else {
                console.log(error);
            }
        }
    }

    render() {

        const masonryOptions = {
            itemSelector: '.grid-item',
            breakpointCols: 3,
            columnWidth: 300,
            gutter: 10,
            isFitWidth: true
        };

        const isError = !!this.props.error;
        const viewError = isError ? <h6 style={{color: 'red'}}>{this.props.error}</h6> : null;

        return (
            <div>
                <Header/>
                <button className="btn btn-outline-dark" type="button" onClick={this.handleBack} style={{float:'right'}}>Back</button>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">CommentArticle</h5>
                                    <form className="form-signin">
                                        <div className="form-label-group">
                                            <label htmlFor="inputTitle">Title</label>
                                            <input type="text" id="inputTitle" className="form-control" placeholder="title" name="title" value={this.props.article.title} disabled/>
                                        </div>
                                        <br/>
        
                                        <div className="form-label-group">
                                            <label htmlFor="inputBody">Body</label>
                                            <input type="text" id="inputBody" className="form-control" placeholder="body" name="body" value={this.props.article.body} disabled/>
                                        </div>
                                        <br/>
        
                                        <div className="form-label-group">
                                            <label htmlFor="inputDateCreated">DateCreated</label>
                                            <input type="text" id="inputDateCreated" className="form-control" placeholder="dateCreated" name="dateCreated" value={this.props.article.dateCreated} disabled/>
                                        </div>
                                        <br/>

                                        <div className="form-label-group">
                                            <label htmlFor="inputDateUpdated">DateUpdated</label>
                                            <input type="text" id="inputDateUpdated" className="form-control" placeholder="dateUpdated" name="dateUpdated" value={this.props.article.dateUpdated} disabled/>
                                        </div>
                                        <br/>
                                        {viewError}
                                        <br/>
                                        <hr className="my-4"></hr>
                                        <p>
                                            <button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#Comment" aria-expanded="false" aria-controls="Comment">
                                                Comment
                                            </button>
                                            <button className="btn btn-outline-success" type="button" style={{float:'right'}} data-toggle="collapse"
                                                    data-target="#Comment" aria-expanded="false" aria-controls="Comment" disabled={this.props.isDisabled} onClick={this.handleCreateComment}>
                                                AddComment
                                            </button>
                                        </p>
                                        <div className="collapse" id="Comment">
                                            <input type="text" id="user" className="form-control" placeholder="user" value={this.props.user.login} disabled/>
                                            <div className="md-form">
                                                <textarea id="form10" className="md-textarea form-control" rows="3" value={this.props.commentText} onChange={this.handleChangeField}></textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Masonry
                options={masonryOptions}
                >
                        {
                            this.props.comments.map((comment) => (
                                <Comment
                                    key={comment.id || ''}
                                    title={comment.owner}
                                >
                                    {comment.text}
                                </Comment>
                            ))
                        }
                </Masonry>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.article.data,
        error: state.comment.message,
        commentText: state.comment.commentText,
        isDisabled: state.comment.isDisabled,
        user: state.app.user,
        comments: state.comment.comments
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (token, id) => dispatch(getArticle(token, id)),
        updateField: (value) => dispatch(updateField(value)),
        updateDisabled: (isDisabled) => dispatch(updateDisabled(isDisabled)),
        createComment: (url, token, comment) => dispatch(createComment(url, token, comment)),
        getComments: (url, token) => dispatch(getComments(url, token)),
        updateComment: (comment) => dispatch(updateComment(comment))
    }
};

  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(ArticleCommetns));