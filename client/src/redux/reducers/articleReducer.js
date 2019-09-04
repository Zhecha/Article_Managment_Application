export default (state = {
    data: {
        id:'',
        title: '',
        body: '',
        dateCreated: '',
        dateUpdated: '',
        creator: '',
        property: ''
    },
    isDisabled: true,
    isShow: false,
    message: '',
    property: null
}, action) => {
    switch (action.type) {
        case 'VIEW_ERRORS':
            return {
                ...state,
                message: action.payload.message
            };
        case 'UPDATE_FIELD':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.field]: action.payload.value,
                },
                message: ''
            };
        case 'LOAD_ARTICLE':
            return {
                ...state,
                data: {
                    id: action.payload.article.id,
                    title: action.payload.article.title,
                    body: action.payload.article.body,
                    dateCreated: action.payload.article.dateCreated,
                    dateUpdated: action.payload.article.dateUpdated,
                    creator: action.payload.article.creator,
                    property: action.payload.article.property
                }
            }
        case 'UDPATE_DISABLED': 
            return {
                ...state,
                isDisabled: action.payload.isDisabled
            }
        case 'UPDATE_SHOW': 
            return {
                ...state,
                isShow: action.payload.isShow
            }
        case 'CHANGE_PROPERTY': 
            return {
                ...state,
                property: action.payload.property,
                message: ''
            }
        default:
            return state;
    }
  };