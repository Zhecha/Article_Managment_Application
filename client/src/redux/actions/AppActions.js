import axios from 'axios';
import * as urls from '../../constants/urls';
import * as header from '../../constants/headers';

export const updateUser = (id, login, email) => {

    return {
        type: 'UPDATE_USER',
        payload: {
            id,
            login,
            email
        }
    }
    
}

export const init  = (inited) => {
    return {
        type: 'INIT_APP',
        payload: {
            inited
        }
    }
}

export const checkAuth  = (token) => {
    return async function (dispatch) {
        try {
            let user = await axios.post(urls.URL_TOKEN, {}, header.headerPostPut(token));
            dispatch(updateUser(user.data.id,user.data.login,user.data.email));
            return user;

        } catch (error) {
            const err = error.response.data;
            console.log(err);
            throw err
        }
    }
}

export const deleteUser = () => {
    return {
        type: 'DELETE_USER'
    }
}