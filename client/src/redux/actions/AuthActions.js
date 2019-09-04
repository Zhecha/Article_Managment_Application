import axios from 'axios';
import {token} from '../../components/Token';
import {updateUser}  from './AppActions';

export const updateFields = (field, value) => {

    return {
        type: 'UPDATE_FIELD',
        payload: {
            field,
            value
        }
    }
}

const viewErrors = (message) => {
 
    return {
        type: 'VIEW_ERRORS',
        payload : {
            message: message
        }
    }
}

export const signInOrSignUp = (url, obj) => { 

    return async function(dispatch) {
        try {
            const user = await axios.post(url, obj);
            token.setToken(user.data.token);
            dispatch(updateUser(user.data.user.id, user.data.user.login, user.data.user.email));
        } catch (error) {
            const message = error.response.data.message;
            dispatch(viewErrors(message));
            throw error
        }
    }
}