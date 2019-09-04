export const SIGN_IN = '/authentication'; 

export const SIGN_UP = '/signup'; 

export const ARTICLE_LIST = '/articlelist'; 

export const CREATE_ARTICLE = '/createArticle';

export const ARTICLE_COMMENTS = '/articleComments/:id'

export const commentArticleRoute = (id) => {
    return `/articleComments/${id}`
}

export const commentArticleRouteWithPage = (id, pageNumber, limit) => {
    return `/articleComments/${id}?page=${pageNumber}&limit=${limit}`
}

export const commentArticleRouteWithPageWithSort = (id, pageNumber, limit, sort, sortBy) => {
    return `/articleComments/${id}?page=${pageNumber}&limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const commentArticleLimitRoute = (id, limit) => {
    return `/articleComments/${id}?limit=${limit}`
}

export const commentArticleLimitRouteWithSort = (id, limit, sort, sortBy) => {
    return `/articleComments/${id}?limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const commentArticleRouteWithSort = (id, sort, sortBy) => {
    return `/articleComments/${id}?sort=${sort}&by=${sortBy}`
}

export const createArticleRouteWithoutPageWithSort = (sort, sortBy) => {
    return `/createArticle?sort=${sort}&by=${sortBy}`
}

export const createArticleRoute = (pageNumber, limit)=> { 
    return `/createArticle?page=${pageNumber}&limit=${limit}` 
}

export const createArticleRouteWithSort = (pageNumber, limit, sort, sortBy) => {
    return `/createArticle?page=${pageNumber}&limit=${limit}&sort=${sort}&by=${sortBy}` 
}

export const createArticleLimitRoute = (limit) => {
    return `/createArticle?limit=${limit}`
}

export const createArticleLimitRouteWithSort = (limit, sort, sortBy) => {
    return `/createArticle?limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const editArticleRoute = (id, pageNumber, limit)=> { 
    return `/editArticle/${id}?page=${pageNumber}&limit=${limit}`; 
}

export const editArticleRouteWithSort = (id, pageNumber, limit, sort, sortBy) => {
    return `/editArticle/${id}?page=${pageNumber}&limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const editArticleLimitRoute = (id, limit) => {
    return `/editArticle/${id}?limit=${limit}`
}

export const editArticleLimitRouteWithSort = (id, limit, sort, sortBy) => {
    return `/editArticle/${id}?limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const editArticleRouteWithoutLimitPage = (id) => {
    return `/editArticle/${id}`;
}

export const editArticleRouteWithoutLimitPageWithSort = (id, sort, sortBy) => {
    return `/editArticle/${id}?sort=${sort}&by=${sortBy}`;
}

export const viewArticleRoute = (id,pageNumber,limit) => { 
    return `/articlelist?page=${pageNumber}&limit=${limit}&view=${id}`; 
} 

export const viewArticleRouteWithSort = (id, pageNumber, limit, sort, sortBy) => {
    return `/articlelist?page=${pageNumber}&limit=${limit}&view=${id}&sort=${sort}&by=${sortBy}`
}

export const pageArticleRoute = (pageNumber, limit) => { 
    return `/articlelist?page=${pageNumber}&limit=${limit}` 
}

export const pageArticleRouteWithSort = (pageNumber, limit, sort, sortBy) => {
    return `/articlelist?page=${pageNumber}&limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const pageArticleLimitRouteWithSort = (limit, sort, sortBy) => {
    return `/articlelist?limit=${limit}&sort=${sort}&by=${sortBy}`
}

export const pageArticleRouteLimit = (limit) => { 
    return `/articlelist?limit=${limit}` 
}

export const pageArticleRouteLimitPrivate = (limit, isPrivate) => {
    return `/articlelist?limit=${limit}&private=${isPrivate}` 
}

export const pageArticleRouteSort = (sort, sortBy) => {
    return `/articlelist?sort=${sort}&by=${sortBy}`
}

export const pageArticleRouteSortPrivate = (sort, sortBy, isPrivate) => {
    return `/articlelist?sort=${sort}&by=${sortBy}&private=${isPrivate}`
}

export const viewArticleLimitRoute = (id) => {
    return `/articlelist?view=${id}`
}

export const viewArticleLimitRouteWithSort = (id, sort, sortBy) => {
    return `/articlelist?view=${id}&sort=${sort}&by=${sortBy}`
}

export const viewArticleWithoutPage = (id, limit) => {
    return `/articlelist?limit=${limit}&view=${id}`
}

export const viewArticleWithoutPageWithSort = (id, limit, sort, sortBy) => {
    return `/articlelist?limit=${limit}&view=${id}&sort=${sort}&by=${sortBy}`
}

export const privateArticleRoute = (isPrivate) => {
    return `/articlelist?private=${isPrivate}`
}

export const EDIT_ARTICLE = '/editArticle/:id'; 

export const ROOT = '/';