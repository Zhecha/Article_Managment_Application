import mongoose from "mongoose";

import "../models/user";

import "../models/articleList";

import "../models/comment";

const User = mongoose.model('User');
const ArticleList = mongoose.model('ArticleList');
const Comment = mongoose.model('Comment');

export const createComment = async(data) => {
    const comment = new Comment({
        text: data.text,
        owner: data.id,
        creator: data.creator
    });
    return await comment.save();
}

export const findComments = async(data) => {
    const comments =  await Comment.find({owner: data.id});
    return comments || [];
}


export const createUser = data => {
    const user = new User({
        login: data.login,
        email: data.email,
        password: data.password
    });

    return user.save();
}

export const findUsers = () => {
    return User.find().limit(1);
}

export const findUser = data => {
    return User.findOne({_id: data._id});
}

export const findUserByLoginAndEmail = data => {
    return User.findOne({login: data.login, email: data.email});
}

export const findUserByLogin = data => {
    return User.findOne({ login : data.login });
}

export const findUserByEmail = data => {
    return User.findOne({email: data.email});
}

export const findArticles = async(data) => {
   const articles = await ArticleList.find({$or:[{creator: data._id}, {public: true}]});
   return articles || [];
}

export const findArticlesPrivate = async(data) => {
    const articles = await ArticleList.find({creator: data._id, private: true});
    return articles || [];
}

export const findArticlesPublic = async(data) => {
    const articles = await ArticleList.find({creator: data._id, public: true});
    return articles || [];
}

export const findLimitArticles = async(data) => {
    if(data.by === 'title'){
        if(data.sort === 'asc') {
            return await ArticleList.find({$or: [{creator: data.id}, {public: true}]}).skip((data.perPage * data.page) - data.perPage).limit(data.perPage).sort({title: 1}).exec(); 
        } else if( data.sort === 'desc') {
            return await ArticleList.find({$or: [{creator: data.id}, {public: true}]}).skip((data.perPage * data.page) - data.perPage).limit(data.perPage).sort({title: -1}).exec(); 
        }
    } else if(data.by === 'body') {
        if(data.sort === 'asc') {
            return await ArticleList.find({$or: [{creator: data.id}, {public: true}]}).skip((data.perPage * data.page) - data.perPage).limit(data.perPage).sort({body: 1}).exec(); 
        } else if( data.sort === 'desc') {
            return await ArticleList.find({$or: [{creator: data.id}, {public: true}]}).skip((data.perPage * data.page) - data.perPage).limit(data.perPage).sort({body: -1}).exec(); 
        }
    } else {
        return await ArticleList.find({$or: [{creator: data.id}, {public: true}]}).skip((data.perPage * data.page) - data.perPage).limit(data.perPage).sort({dateUpdated: -1}).exec(); 
    }   
}

export const findArticle = async(data)  => {
    return await ArticleList.findOne({_id: data._id})
}


export const createArticlePrivate = async(user,article) => {
    let articleList = new ArticleList({
        title: article.title,
        body: article.body,
        dateCreated: new Date().toLocaleString(),
        dateUpdated: new Date().toLocaleString(),
        private: true,
        creator: user._id
    });

    return await articleList.save();
}

export const createArticlePublic = async(user,article) => {
    let articleList = new ArticleList({
        title: article.title,
        body: article.body,
        dateCreated: new Date().toLocaleString(),
        dateUpdated: new Date().toLocaleString(),
        public: true,
        creator: user._id
    });

    return await articleList.save();
}


export const editArticle = async(article) => {

    const oldArticle = await findArticle({_id: article.id});
    oldArticle.title = article.title;
    oldArticle.body = article.body;
    oldArticle.dateUpdated = new Date().toLocaleString();
    return await oldArticle.save();

}
