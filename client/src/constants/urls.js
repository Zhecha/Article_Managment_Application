
export const URL_TOKEN = 'http://localhost:3001/checkToken';

export const URL_SIGN_IN = 'http://localhost:3001/signin';

export const URL_SIGN_UP = 'http://localhost:3001/signup';

export const URL_ARTICLE = 'http://localhost:3001/articlelist';

export const urlArticleId = (id) => {
    return `http://localhost:3001/articlelist/${id}`;
}

export const urlPageNumberSort = (pageNumber,limit, sort) => {
    return `http://localhost:3001/articlelist?page=${pageNumber}&limit=${limit}&sort=${sort}`;
}

export const urlPageNumberSortByTitle = (pageNumber,limit, sort, title) => {
    return `http://localhost:3001/articlelist?page=${pageNumber}&limit=${limit}&sort=${sort}&by=${title}`;
}

export const urlPageNumberSortByBody = (pageNumber,limit, sort, body) => {
    return `http://localhost:3001/articlelist?page=${pageNumber}&limit=${limit}&sort=${sort}&by=${body}`;
}

export const URL_COMMENT = 'http://localhost:3001/commentarticle';

export const urlArticleComments = (id) => {
    return `http://localhost:3001/commentarticle/${id}`
}

export const URL_ROOT = 'http://localhost:3001/';