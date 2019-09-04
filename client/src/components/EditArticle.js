import React from 'react';
import { connect } from 'react-redux';
import {updateFields,updateDisabled,getArticle} from '../redux/actions/ArticleActions';
import {token} from './Token';
import withNoUser from './withNoUser';
import * as urls from '../constants/urls';
import * as route from '../constants/routes';
import ArticleForm from './ArticleForm';

class EditArticle extends React.Component {
    
    constructor(props){
        super(props);
        this.handleFields = this.handleFields.bind(this);
        this.getData = this.getData.bind(this);
    }


    handleFields(event) {
        this.props.updateDisabled(false);
        this.props.updateFields(event.target.name, event.target.value);
    }

    async componentDidMount() {
        try {
            const gettedToken = token.getToken();
            await this.props.getArticle(gettedToken, this.props.match.params.id);
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

    getData(){
        const url = urls.urlArticleId(this.props.match.params.id); 
        const article = { 
            id: this.props.match.params.id, 
            title: this.props.article.title, 
            body: this.props.article.body 
        }
        return {url,article};
    }

    render() {

        return (
            <ArticleForm header="EditArticle" title={this.props.article.title} body={this.props.article.body}
                        handleFields={this.handleFields} isDisabled={this.props.isDisabled} isEdit={true} getData={this.getData}/>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        article: state.article.data,
        isDisabled: state.article.isDisabled,
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        updateFields: (field, value) => dispatch(updateFields(field, value)),
        updateDisabled: (isDisabled) => dispatch(updateDisabled(isDisabled)),
        getArticle: (token, id) => dispatch(getArticle(token, id))
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(EditArticle));
