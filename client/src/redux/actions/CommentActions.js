import axios from 'axios';
import * as header from '../../constants/headers';
import {deleteUser} from './AppActions';

export const updateDisabled = (isDisabled) => {
    return {
        type: 'UPDATE_DISABLED',
        payload: {
            isDisabled
        }
    }
}

export const updateField = (value) => {

    return {
        type: 'UPDATE_FIELD',
        payload: {
            value
        }
    }
}

const viewErrors = (message) => {
    return {
        type: 'VIEW_ERRORS',
        payload: {
            message
        }
    }
}



const loadComments = (comments) => {
    return {
        type: 'LOAD_COMMENTS',
        payload: {
            comments
        }
    }
}

export const updateComment = (comment) => {
    return {
        type: 'UPDATE_COMMENTS',
        payload: {
            comment
        }
    }
}

export const createComment = (url, token, comment) => {
    return async(dispatch) => {
        try {
            const newComment = await axios.post(url, comment, header.headerPostPut(token));
            dispatch(updateComment(newComment.data));
        } catch (error) {
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

export const getComments = (url, token) => {
    return async(dispatch) => {
        try {
            const comments = await axios.get(url, header.headerGet(token));
            dispatch(loadComments(comments.data))
        } catch (error) {
            const isInvalidToken = error.response.data.isInvalidToken;
            if(isInvalidToken){
                error.isInvalidToken = isInvalidToken;
                dispatch(deleteUser());
                throw error;
            } else {
                throw error
            }
        }
    }
}