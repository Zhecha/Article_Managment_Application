import React from 'react';
import { connect } from 'react-redux';
import {updateFields} from '../redux/actions/ArticleActions';
import withNoUser from './withNoUser';
import * as urls from '../constants/urls';
import ArticleForm from './ArticleForm';

class CreateArticle extends React.Component {
    
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }

    getData(){
        const article = {
            title: this.props.article.title,
            body: this.props.article.body,
            property: this.props.property
        };
        const url = urls.URL_ARTICLE;
        return {url,article}
            
    }

    componentDidMount(){
        this.props.updateFields('','')
    }

    handleFields(event) {
        this.props.updateFields(event.target.name, event.target.value);
    }

    render() {

        return (
            <ArticleForm header="CreateArticle" title={this.props.article.title} body={this.props.article.body}
                            handleFields={this.handleFields} getData={this.getData} isEdit={false} />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        article: state.article.data,
        page: state.page.page,
        property: state.article.property
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        updateFields: (field, value) => dispatch(updateFields(field, value)),
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(CreateArticle));
