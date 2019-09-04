import React from 'react';
import {token} from './Token';
import * as route from '../constants/routes';
import withNoUser from './withNoUser';
import { connect } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import {getPagesData} from '../redux/actions/PageActions';
import * as func from '../functions/functions';
 
class FooterPagination extends React.Component {
    
    constructor(props){
        super(props);
        this.handleGetPagesData = this.handleGetPagesData.bind(this);
    }
    
    async handleGetPagesData(pageNumber) {
        try {
            const gettedToken = token.getToken()
            const limit = this.props.page.perPage;
            if(this.props.location.search.length){
                const query = func.queryParse(this.props.location.search);
                if(pageNumber === 1){
                    if(limit === 5) {
                        if(!query.sort){
                            this.props.history.push(route.ARTICLE_LIST);
                            await this.props.getPagesData(gettedToken,pageNumber,limit,this.props.isOnlyPrivate);
                        } else {
                            this.props.history.push(route.pageArticleRouteSort(query.sort,query.by))
                            await this.props.getPagesData(gettedToken,pageNumber,limit,query.sort, query.by,this.props.isOnlyPrivate);
                        }
                    } else {
                        if(!query.sort){
                            this.props.history.push(route.pageArticleRouteLimit(limit));
                            await this.props.getPagesData(gettedToken,pageNumber,limit,this.props.isOnlyPrivate);
                        } else {
                            this.props.history.push(route.pageArticleLimitRouteWithSort(limit,query.sort,query.by))
                            await this.props.getPagesData(gettedToken,pageNumber,limit,query.sort, query.by,this.props.isOnlyPrivate);
                        }
                    }
                } else if(!query.sort) {
                    this.props.history.push(route.pageArticleRoute(pageNumber, limit))
                    await this.props.getPagesData(gettedToken,pageNumber,limit,this.props.isOnlyPrivate);
                } else {
                    this.props.history.push(route.pageArticleRouteWithSort(pageNumber,limit,query.sort,query.by))
                    await this.props.getPagesData(gettedToken,pageNumber,limit,query.sort, query.by,this.props.isOnlyPrivate);
                }
            } else {
                this.props.history.push(route.pageArticleRoute(pageNumber,limit));
                await this.props.getPagesData(gettedToken,pageNumber,limit,this.props.isOnlyPrivate);
            }
        } catch (error) {
            if(error.isInvalidToken){
                token.logout();
                this.props.history.push(route.SIGN_IN);
            } else {
                console.log(error.response);
            }
        }
    }

    render() {
        
        let renderPageNumers;
        const pageNumbers = [];

        if (this.props.page.total !== null) {
            for (let i = 1; i <= this.props.page.total; i++) {
              pageNumbers.push(i);
            }

            renderPageNumers = pageNumbers.map(number => {
                let active = this.props.page.currentPage === number ? true : false;
              
                if (number === 1 || number === this.props.page.total || (number >= this.props.page.currentPage - 2 && number <= this.props.page.currentPage + 2)) {
                  return (
                    <Pagination.Item key={number} onClick={() => {this.handleGetPagesData(number)}} active={active}>{number}</Pagination.Item>
                  );
                }
            });
        }

        return (
                <Pagination style={{display: "flex", flexDirection:"row", justifyContent:'center'}}>
                    {renderPageNumers && renderPageNumers}
                </Pagination>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       page: state.page.page,
       isDesc: state.page.isDesc,
       isOnlyPrivate: state.page.isOnlyPrivate
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        getPagesData: (token, pageNumber, limit, sort, sortBy) => dispatch(getPagesData(token, pageNumber, limit, sort, sortBy))
    }
};

  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(FooterPagination));