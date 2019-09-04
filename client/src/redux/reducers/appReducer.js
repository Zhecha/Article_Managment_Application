export default (state = {
    user : null,
    inited: false,
}, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    login: action.payload.login,
                    email: action.payload.email
                }
            }
        case 'INIT_APP': 
            return {
                ...state,
                inited: action.payload.inited
            }
        case 'DELETE_USER':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
};