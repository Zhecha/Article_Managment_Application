export default (state = {
    login : '',
    email : '',
    password: '',
    error: {
        message: ''
    }
}, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.payload.field]: action.payload.value,
                error : {
                    message: ''
                }
            };
        case 'VIEW_ERRORS':
            return {
                ...state,
                error: {
                    message: action.payload.message
                }
            };
        default:
                return state;
    }
  };