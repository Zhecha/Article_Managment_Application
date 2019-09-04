import axios from 'axios';
import {deleteUser} from './AppActions';
import * as urls from '../../constants/urls';
import * as header from '../../constants/headers';


const loadArticle = (article) => {
    return {
        type: 'LOAD_ARTICLE',
        payload: {
            article
        }
    }
}

export const updateFields = (field, value) => {
    return {
        type: 'UPDATE_FIELD',
        payload: {
            field,
            value
        }
    }
}


export const updateDisabled = (isDisabled) => {
    return {
        type: 'UDPATE_DISABLED',
        payload: {
            isDisabled
        }
    }
}

export const updateShow = (isShow) => {
    return {
        type: 'UPDATE_SHOW',
        payload: {
            isShow
        }
    }
}

export const viewErrors = (message) => {
    return {
        type: 'VIEW_ERRORS',
        payload: {
            message
        }
    }
}

export const createOrEditArticle = (url, token, article) => {
    return async function(dispatch) {
        try {
            if(article.id){
                const data = await axios.put(url, {article},header.headerPostPut(token));
                return data;
            } else {
                const data = await axios.post(url, {article},header.headerPostPut(token));
                dispatch(updateFields('',''))
                return data;
            }
        } catch (error) {
            console.log(error);
            const message = error.response.data.message;
            const isInvalidToken = error.response.data.isInvalidToken;
            if(isInvalidToken){
                error.isInvalidToken = isInvalidToken;
                dispatch(deleteUser());
                throw error;
            } else {
                dispatch(viewErrors(message));
                throw error
            }
        }
    }
}

export const getArticle = (token, id) => {

    return async function(dispatch) {
        try {
            const url = urls.urlArticleId(id);
            const article = await axios.get(url, header.headerGet(token));
            dispatch(loadArticle(article.data));
        } catch (error) {
            const isInvalidToken = error.response.data.isInvalidToken;
            if(isInvalidToken){
                error.isInvalidToken = isInvalidToken;
                dispatch(deleteUser());
                throw error;
            } else {
                console.log(error.response.data); 
                throw error;
            }
        }
    }
}

export const changeProperty = (property) => {
    return {
        type: 'CHANGE_PROPERTY',
        payload: {
            property
        }
    }
}
