import React from 'react';
import {token} from './Token';
import * as route from '../constants/routes';
import withNoUser from './withNoUser';
import { connect } from 'react-redux';
import Article from './Article';
import Header from './Header';
import {getPagesData, updateError,updateSort,updateSortBy,updatePrivateProperty} from '../redux/actions/PageActions';
import FooterPagination from './FooterPagination';
import Alert from 'react-bootstrap/Alert';
import ModalArticle from './ModalArticle';
import {updateShow, updateFields} from '../redux/actions/ArticleActions';
import * as func from '../functions/functions';
 
class ArticleList extends React.Component {
    
    constructor(props){
        super(props);
        this.handleCreateArticle = this.handleCreateArticle.bind(this);
        this.handleChangeLimit = this.handleChangeLimit.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    async handleSort(event){
        const gettedToken = token.getToken();
        const page = this.props.page.currentPage;
        const limit = this.props.page.perPage;
        this.props.updateSortBy(event.target.value)
        this.props.updateSort(!this.props.isDesc);
        if(this.props.isDesc){
            if(this.props.location.search.length){
                const query = func.queryParse(this.props.location.search);  
                if(!query.page && query.limit) {
                    this.props.history.push(route.pageArticleLimitRouteWithSort(query.limit, 'desc',event.target.value))
                    await this.props.getPagesData(gettedToken,page,query.limit,'desc',event.target.value);
                } else if (query.page && query.limit) {
                    this.props.history.push(route.pageArticleRouteWithSort(query.page, query.limit, 'desc',event.target.value))
                    await this.props.getPagesData(gettedToken,query.page,query.limit,'desc',event.target.value);
                } else {
                    this.props.history.push(route.pageArticleRouteSort('desc',event.target.value))
                    await this.props.getPagesData(gettedToken,page,limit,'desc',event.target.value);
                }
            } else {
                this.props.history.push(route.pageArticleRouteSort('desc',event.target.value))
                await this.props.getPagesData(gettedToken,page,limit,'desc',event.target.value);
            }
        } else {
            if(this.props.location.search.length){
                const query = func.queryParse(this.props.location.search);  
                if(!query.page && query.limit) {
                    this.props.history.push(route.pageArticleLimitRouteWithSort(query.limit, 'asc',event.target.value))
                    await this.props.getPagesData(gettedToken,page,query.limit,'asc',event.target.value);
                } else if (query.page && query.limit) {
                    this.props.history.push(route.pageArticleRouteWithSort(query.page, query.limit, 'asc',event.target.value))
                    await this.props.getPagesData(gettedToken,query.page,query.limit,'asc',event.target.value);
                } else {
                    this.props.history.push(route.pageArticleRouteSort('asc',event.target.value))
                    await this.props.getPagesData(gettedToken,page,limit,'asc',event.target.value);
                }
            } else {
                this.props.history.push(route.pageArticleRouteSort('asc',event.target.value))
                await this.props.getPagesData(gettedToken,page,limit,'asc',event.target.value);
            }
        }
    
    }

    
    handleCreateArticle() {
        if(!this.props.location.search.length){
            this.props.history.push(route.CREATE_ARTICLE);
        } else {
            const query = func.queryParse(this.props.location.search);
            if(!query.page) {
                if(!query.limit) {
                    this.props.history.push(route.createArticleRouteWithoutPageWithSort(query.sort, query.by))
                } else {
                    if(!query.sort) {
                        this.props.history.push(route.createArticleLimitRoute(query.limit))
                    } else {
                        this.props.history.push(route.createArticleLimitRouteWithSort(query.limit, query.sort, query.by))
                    }
                }
            } else {
                if(!query.sort) {
                    this.props.history.push(route.createArticleRoute(query.page, query.limit));
                } else {
                    this.props.history.push(route.createArticleRouteWithSort(query.page, query.limit, query.sort, query.by))
                }
            }
        }
    }

    async handleChangeLimit(event) {

        const gettedToken = token.getToken();
        const firstPage = this.props.page.currentPage;
        if(this.props.location.search.length){
            const query = func.queryParse(this.props.location.search);
            query.limit = event.target.value;
            if(!query.page) {
                if(!event.target.value) {
                    this.props.history.push(route.pageArticleLimitRouteWithSort(event.target.value, query.sort, query.by))
                    await this.props.getPagesData(gettedToken,firstPage,event.target.value, query.sort, query.by);
                } else {
                    if(event.target.value === "5") {
                        if(!query.sort){
                            this.props.history.push(route.ARTICLE_LIST);
                            await this.props.getPagesData(gettedToken,firstPage,event.target.value);
                        } else {
                            this.props.history.push(route.pageArticleRouteSort(query.sort, query.by))
                            await this.props.getPagesData(gettedToken,firstPage,event.target.value, query.sort, query.by);
                        }
                    } else {
                        if(!query.sort){
                            this.props.history.push(route.pageArticleRouteLimit(event.target.value))
                            await this.props.getPagesData(gettedToken,firstPage,event.target.value);
                        } else {
                            this.props.history.push(route.pageArticleLimitRouteWithSort(event.target.value, query.sort, query.by))
                            await this.props.getPagesData(gettedToken,firstPage,event.target.value, query.sort, query.by);
                        }
                    }
                }
            } else {
                if(!query.sort) {
                    this.props.history.push(route.pageArticleRoute(query.page, event.target.value))
                    await this.props.getPagesData(gettedToken,query.page,event.target.value);
                } else {
                    this.props.history.push(route.pageArticleRouteWithSort(query.page, event.target.value, query.sort, query.by))
                    await this.props.getPagesData(gettedToken,query.page,event.target.value, query.sort, query.by);
                }
            }
        } else {
            if(event.target.value === '5'){
                this.props.history.push(route.ARTICLE_LIST)
                await this.props.getPagesData(gettedToken,this.props.page.currentPage,event.target.value);
            } else{
                this.props.history.push(route.pageArticleRouteLimit(event.target.value))
                await this.props.getPagesData(gettedToken,this.props.page.currentPage,event.target.value);
            }
        }
    }

    async componentDidMount() {
        const gettedToken = token.getToken();
        try {
            const limit = this.props.page.perPage;
            const firstPage = this.props.page.currentPage;
            if(!this.props.location.search.length){
                await this.props.getPagesData(gettedToken,firstPage,limit,'desc','date');
                this.props.history.push(route.ARTICLE_LIST);
            } else {
                const query = func.queryParse(this.props.location.search);
                if(!query.page) {
                    if(query.limit && !query.view){
                        if(query.limit === '5'){
                            if(!query.sort){
                                this.props.history.push(route.ARTICLE_LIST);
                                await this.props.getPagesData(gettedToken,firstPage,query.limit);
                            } else {
                                this.props.history.push(route.pageArticleRouteSort(query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,query.limit,query.sort, query.by);
                            }
                        } else {
                            if(!query.sort) {
                                this.props.history.push(route.pageArticleRouteLimit(query.limit))
                                await this.props.getPagesData(gettedToken,firstPage,query.limit);
                            } else {
                                this.props.history.push(route.pageArticleLimitRouteWithSort(query.limit,query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,query.limit,query.sort,query.by);
                            }
                        }
                    } else if(query.limit && query.view) {
                        if(!query.sort) {
                            this.props.history.push(route.viewArticleWithoutPage(query.view, query.limit))
                            await this.props.getPagesData(gettedToken,firstPage,query.limit);
                            this.props.updateShow(true);
                        } else {
                            this.props.history.push(route.viewArticleWithoutPageWithSort(query.view, query.limit, query.sort, query.by))
                            await this.props.getPagesData(gettedToken,firstPage,query.limit, query.sort, query.by);
                            this.props.updateShow(true);
                        }
                    } else {
                        if(query.view){
                            if(!query.sort){
                                this.props.history.push(route.viewArticleLimitRoute(query.view));
                                await this.props.getPagesData(gettedToken,firstPage,limit);
                                this.props.updateShow(true);
                            } else {
                                this.props.history.push(route.viewArticleLimitRouteWithSort(query.view, query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,limit,query.sort,query.by);
                                this.props.updateShow(true);
                            }
                        } else {
                            this.props.history.push(route.pageArticleRouteSort(query.sort, query.by))
                            await this.props.getPagesData(gettedToken,firstPage,limit,query.sort,query.by);
                        }
                    }  
                } else if(query.page === '1') {
                    if(query.limit === '5') {
                        if(query.view){
                            if(!query.sort) {
                                const viewRoute = route.viewArticleLimitRoute(query.view);
                                this.props.history.push(viewRoute);
                                await this.props.getPagesData(gettedToken,firstPage,limit);
                                this.props.updateShow(true);
                            } else {
                                this.props.history.push(route.viewArticleLimitRouteWithSort(query.view, query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,limit, query.sort, query.by);
                                this.props.updateShow(true);
                            }
                        } else {
                            if(!query.sort) {
                                await this.props.getPagesData(gettedToken,firstPage,query.limit);
                                this.props.history.push(route.ARTICLE_LIST);
                            } else {
                                this.props.history.push(route.pageArticleRouteSort(query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,limit, query.sort, query.by);
                            }
                        }
                    } else {
                        if(query.view){
                            if(!query.sort) {
                                const viewRoute = route.viewArticleWithoutPage(query.view,query.limit);
                                this.props.history.push(viewRoute);
                                await this.props.getPagesData(gettedToken,firstPage,query.limit);
                                this.props.updateShow(true);
                            } else {
                                this.props.history.push(route.viewArticleWithoutPageWithSort(query.view, query.limit,query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,query.limit, query.sort, query.by);
                                this.props.updateShow(true);
                            }
                        } else {
                            if(!query.sort) {
                                await this.props.getPagesData(gettedToken,firstPage,query.limit);
                                this.props.history.push(route.pageArticleRouteLimit(query.limit));
                            } else {
                                this.props.history.push(route.pageArticleLimitRouteWithSort(query.limit, query.sort, query.by))
                                await this.props.getPagesData(gettedToken,firstPage,query.limit, query.sort, query.by);
                            }
                        }
                    }
                } else if(query.view) {
                    if(!query.sort) {
                        const viewRoute = route.viewArticleRoute(query.view,query.page,query.limit);
                        this.props.history.push(viewRoute);
                        await this.props.getPagesData(gettedToken,query.page,query.limit);
                        this.props.updateShow(true);
                    } else {
                        this.props.history.push(route.viewArticleRouteWithSort(query.view, query.page, query.limit, query.sort, query.by));
                        await this.props.getPagesData(gettedToken,query.page,query.limit, query.sort, query.by);
                        this.props.updateShow(true);
                    }
                } else {
                    if(!query.sort) {
                        await this.props.getPagesData(gettedToken,query.page,query.limit);
                    } else {
                        await this.props.getPagesData(gettedToken,query.page,query.limit, query.sort, query.by);
                    }
                }
            }
        } catch (error) {
            if(error.isInvalidToken){
                token.logout();
                this.props.history.push(route.SIGN_IN);
            } else {
                this.props.updateError({flag: true, status : error.response.status, message: error.response.statusText});
                console.log(error.response);
            }
        }
    }
    

    render() {
        let articles = this.props.page.articles.length ? this.props.page.articles.map((obj, index) => {
            if(obj.creator !== this.props.user.id) {
                return <Article key={obj.id} title={obj.title} body={obj.body} id={obj.id} index={index + 1} history={this.props.history} datecreated={obj.dateCreated} dateupdated={obj.dateUpdated} isEdit={false}/>
            } else {
                return <Article key={obj.id} title={obj.title} body={obj.body} id={obj.id} index={index + 1} history={this.props.history} datecreated={obj.dateCreated} dateupdated={obj.dateUpdated} isEdit={true}/>
            }
        }) : null;

        let list = null

        if(this.props.isError.flag) {
            list = <Alert variant="danger" onClose={() => this.props.updateError({flag: false, status : '', message: ''})} dismissible>
                  <Alert.Heading>{this.props.isError.status}</Alert.Heading>
                  <p>
                    {this.props.isError.message}
                  </p>
                </Alert>
        } else {
            list = <div className="card card-signin my-5">
                        <div className="card-body">
                            <button type="button" className="btn btn-outline-info" style={{display: "block", float: "right"}} onClick={this.handleCreateArticle}>CreateArticle</button>
                            <button type="button" className="btn btn-outline-info" style={{display: "block", float: "right"}} onClick={this.handleChangePrivateProperty}>GetPrivateArticles</button>
                            <button type="button" className="btn btn-outline-dark" style={{display: "block", float: "left", marginLeft: '150px'}} value="title" name="sortbytitle" onClick={this.handleSort} >SortByTitle</button>
                            <button type="button" className="btn btn-outline-dark" style={{display: "block", float: "left", marginLeft: '290px'}} value="body" name="sortbybody" onClick={this.handleSort} >SortByBody</button>
                            <button type="button" className="btn btn-outline-info" style={{display: "block", float: "right"}} value={5} name="limit5" onClick={this.handleChangeLimit}>5</button>
                            <button type="button" className="btn btn-outline-primary" style={{display: "block", float: "right"}} value={10} name="limit10" onClick={this.handleChangeLimit}>10</button>
                            <button type="button" className="btn btn-outline-dark" style={{display: "block", float: "right"}} value={20} name="limit20" onClick={this.handleChangeLimit} >20</button>
                            <br/>
                            <br/>
                            <ul className="list-group">
                                {articles}
                            </ul>
                        </div>
                    </div>
        }
        return (
            <div>
                <Header/>
                    {list}
                    {this.props.isShow && <ModalArticle show={this.props.isShow} history={this.props.history} location={this.props.location}/>}
                <FooterPagination/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       page: state.page.page,
       isError: state.page.isError,
       isShow: state.article.isShow,
       isDesc: state.page.isDesc,
       user: state.app.user,
       isOnlyPrivate: state.page.isOnlyPrivate
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        getPagesData: (token, pageNumber, limit, sort, sortBy) => dispatch(getPagesData(token, pageNumber, limit, sort, sortBy)),
        updateError: (flag, status, message) => dispatch(updateError(flag, status, message)),
        updateShow: (isShow) => dispatch(updateShow(isShow)),
        updateSort: (isDesc) => dispatch(updateSort(isDesc)),
        updateSortBy: (sortBy) => dispatch(updateSortBy(sortBy)),
        updatePrivateProperty: (isOnlyPrivate) => dispatch(updatePrivateProperty(isOnlyPrivate)),
        updateFields: (field, value) => dispatch(updateFields(field, value))
    }
};

  
export default connect(mapStateToProps, mapDispatchToProps)(withNoUser(ArticleList));