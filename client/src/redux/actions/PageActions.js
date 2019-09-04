import axios from 'axios';
import {deleteUser} from '../actions/AppActions';
import * as urls from '../../constants/urls';
import * as header from '../../constants/headers';

export const loadPagesData = (page) => {
    return {
        type: 'LOAD_PAGES_DATA',
        payload: {
            page
        }
    }
}

export const updateError = (isError) => {
    return {
        type: 'UPDATE_ERROR',
        payload: {
            isError
        }
    }
}

export const updateSort = (isDesc) => {
    return {
        type: 'UPDATE_SORT',
        payload: {
            isDesc
        }
    }
}

export const updateSortBy = (sortBy) => {
    return {
        type: 'UPDATE_SORT_BY',
        payload: {
            sortBy
        }
    }
}

export const getPagesData = (token, pageNumber, limit, sort, sortBy) => { 

    return async(dispatch) => {
        try {
            let url = null;
            if(sortBy === 'title'){
                url = urls.urlPageNumberSortByTitle(pageNumber,limit,sort,sortBy)
            } else if( sortBy === 'body') {
                url = urls.urlPageNumberSortByBody(pageNumber,limit,sort,sortBy)
            } else {
                url = urls.urlPageNumberSort(pageNumber,limit,sort);
            } 
            const page = await axios.get(url, header.headerGet(token));
            if(page.data.articles.length){
                dispatch(loadPagesData(page.data))
                return page.data
            } else {
                dispatch(loadPagesData({articles:[],total: page.data.total, currentPage: page.data.currentPage, perPage: page.data.perPage}))
                return {articles:[],total: page.data.total, currentPage: page.data.currentPage, perPage: page.data.perPage}
            }
        } catch (error) {
            const isInvalidToken = error.response.data.isInvalidToken;
            if(isInvalidToken){
                error.isInvalidToken = isInvalidToken;
                dispatch(deleteUser());
                throw error;
            } else {
                throw error;
            }
        }
    }
}

export const updatePrivateProperty = (isOnlyPrivate) => {
    return {
        type: 'UPDATE_PRIVATE_PROPERTY',
        payload: {
            isOnlyPrivate
        }
    }
}