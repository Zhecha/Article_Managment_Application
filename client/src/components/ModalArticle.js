import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import React from 'react';
import { connect } from 'react-redux';
import {token} from './Token';
import withNoUser from './withNoUser';
import {getArticle,updateShow} from '../redux/actions/ArticleActions';
import * as route from '../constants/routes';
import * as func from '../functions/functions';

class ModalArticle extends React.Component {

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.updateShow(false);
        if(this.props.location.search.length){
            const query = func.queryParse(this.props.location.search);
            if(query.view && !query.page && !query.limit){
                if(!query.sort){
                    this.props.history.push(route.ARTICLE_LIST);
                } else {
                    this.props.history.push(route.pageArticleRouteSort(query.sort, query.by));
                }
            } else if(query.view && query.limit && !query.page) {
                if(!query.sort){
                    this.props.history.push(route.pageArticleRouteLimit(query.limit))
                } else {
                    this.props.history.push(route.pageArticleLimitRouteWithSort(query.limit, query.sort, query.by))
                }
            } else {
                if(!query.sort){
                    this.props.history.push(route.pageArticleRoute(query.page, query.limit))
                } else {
                    this.props.history.push(route.pageArticleRouteWithSort(query.page, query.limit, query.sort, query.by))
                }
            }   
        } else {
            this.props.history.goBack();
        }
    }

    async componentDidMount() {
        try {
            const gettedToken = token.getToken();
            const query = func.queryParse(this.props.location.search);
            await this.props.getArticle(gettedToken, query.view);
            this.props.updateShow(true);
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
        return (
        <Modal
            show={this.props.show}
            history={this.props.history}
            onHide={this.handleClose}
            size="lg"
            aria-hidden={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Article
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Title: {this.props.article.title}</h4>
                <p>
                    Body: {this.props.article.body}
                </p>
                <p>
                    DateCreated: {this.props.article.dateCreated}
                </p>
                <p>
                    DateUpdated: {this.props.article.dateUpdated}
                </p>
                <p>
                    Creator: {this.props.article.creator}
                </p>
                <p>
                    Property: {this.props.article.property}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.article.data
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (token, id) => dispatch(getArticle(token, id)),
        updateShow: (isShow) => dispatch(updateShow(isShow))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(ModalArticle));