export const queryParse = (search) => {
    const queryRequest = search;
    const query = {};
    const pairs = (queryRequest[0] === '?' ? queryRequest.substr(1) : queryRequest).split('&');
    for (var i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[pair[0]] = pair[1] || '';
    }
    return query;
}