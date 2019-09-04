export default (state = {
    page: {
        articles:[],
        total: null,
        currentPage: 1,
        perPage: 5
    },
    isError: {
        flag: false,
        status: '',
        message: ''
    },
    isDesc: true,
    sortBy: null,
    isOnlyPrivate: false 
}, action) => {
    switch (action.type) {
        case 'LOAD_PAGES_DATA':
            return {
                ...state,
                page: {
                    articles: action.payload.page.articles,
                    total: action.payload.page.total,
                    currentPage: action.payload.page.currentPage,
                    perPage: action.payload.page.perPage
                }
            }
        case 'UPDATE_ERROR': 
            return {
                ...state,
                isError: {
                    flag: action.payload.isError.flag,
                    status: action.payload.isError.status,
                    message: action.payload.isError.message
                }
            }
        case 'UPDATE_SORT':
            return {
                ...state,
                isDesc: action.payload.isDesc
            }
        case 'UPDATE_SORT_BY':
            return {
                ...state,
                sortBy: action.payload.sortBy
            }
        case 'UPDATE_PRIVATE_PROPERTY': 
            return {
                ...state,
                isOnlyPrivate: action.payload.isOnlyPrivate
            } 
        default:
                return state;
    }
  };