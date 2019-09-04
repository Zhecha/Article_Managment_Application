export default (state = {
    isDisabled: true,
    message: '',
    commentText: '',
    comments: []
}, action) => {
    switch (action.type) {
        case 'UPDATE_DISABLED':
            return {
                ...state,
                isDisabled: action.payload.isDisabled
            }
        case 'VIEW_ERRORS':
            return {
                ...state,
                message: action.payload.message
            };
        case 'UPDATE_FIELD':
            return {
                ...state,
                commentText: action.payload.value,
                message: ''
            }
        case 'LOAD_COMMENTS':
            return {
                ...state,
                comments: action.payload.comments
            }
        case 'UPDATE_COMMENTS': 
            let commentAlreadyExists = state.comments.find((comment)=> comment.id === action.payload.comment.id);
            let comments = [...state.comments];
            if(!commentAlreadyExists) {
                comments.push(action.payload.comment);            
            }      
            return {
                ...state,
                comments,
                commentText: ''
            };
        default:
            return state;
    }
};