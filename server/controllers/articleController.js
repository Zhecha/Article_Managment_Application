import * as db from '../utils/dbUtils';
import {validateArticle} from '../validation/validateTask';
import * as code from '../constants/codeResponse';
import * as mistakes from '../constants/mistakeMessages';

export const getArticle = async(req, res) => {
    try {
        const id = req.params.id;
        let property = null;
        const article = await db.findArticle({_id: id});
        if(article.private){
            property = 'private';
        } else if(article.public) {
            property = 'public';
        }
        const user = await db.findUser({_id: article.creator});
        res.status(code.CODE_200).send({id: article._id,title: article.title, body: article.body, dateCreated: article.dateCreated, dateUpdated: article.dateUpdated, creator: user.login, property});
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}

export const checkCreateDataArticle = async(req, res, next) => {

    const {title,body, property} = req.body.article;
    if(validateArticle({title,body},res)){
        try {
            let articles = await db.findArticles({_id: req.id});
            const user = await db.findUser({_id: req.id});

            articles = articles.filter((article) => article.title == title);
            if(articles.length){
                const message = mistakes.TITLE_CREATED;
                res.status(code.CODE_400).send({message});
            } else {
                req.user = user;
                req.article = {title, body, property};
                return next();
            }
        } catch (error) {
            res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
        }
    }
}

export const checkEditDataArticle = async(req, res, next) => {
    try {
        const id = req.params.id;
        const {title, body} = req.body.article;
        if(validateArticle({title, body}, res)) {
            req.article = {title, body, id};
            return next();
        }
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}

export const editArticle = async(req, res) => {
    const article = req.article;

    try {
        const newArticle = await db.editArticle(article);
        res.status(code.CODE_200).send({id: newArticle._id,title: newArticle.title, body: newArticle.body, dateCreated: newArticle.dateCreated, dateUpdated: newArticle.dateUpdated});
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}

export const createArticle = async(req, res) => {
   
    const user = req.user;
    const article = req.article;
    try {
        let data = null
        if(article.property === 'private'){
            data = await db.createArticlePrivate(user,article);
            res.send(code.CODE_200, {id: data._id,title: data.title, body: data.body, dateCreated: data.dateCreated, dateUpdated: data.dateUpdated, private: data.private});
        } else {
            data = await db.createArticlePublic(user,article);
            res.send(code.CODE_200, {id: data._id,title: data.title, body: data.body, dateCreated: data.dateCreated, dateUpdated: data.dateUpdated, public: data.public});
        }
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
    
}


export const getLimitArticleData = async(req, res) => {

    try {
        const page = +req.query.page;
        const idUser = req.id;
        const perPage = +req.query.limit;
        const sort = req.query.sort || '';
        const by = req.query.by || '';
        if(!page){
            res.status(code.CODE_400).send(mistakes.BAD_REQUEST);
        } else if (!perPage) {
            res.status(code.CODE_400).send(mistakes.BAD_REQUEST);
        } else  {
            let articles = await db.findLimitArticles({id: idUser, perPage, page ,sort, by});
            const allArticles = await db.findArticles({_id: idUser});
            const total = Math.ceil(allArticles.length / perPage);
            if(!articles.length){
                res.status(code.CODE_200).send({articles:[],perPage,currentPage:page, total: total})
            } else {
                articles = articles.map((obj) => ({id: obj._id,title: obj.title, body: obj.body, dateCreated: obj.dateCreated, dateUpdated: obj.dateUpdated, creator: obj.creator}));
                res.status(code.CODE_200).send({articles,perPage,currentPage: page,total: total});
            }
        }
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }

}