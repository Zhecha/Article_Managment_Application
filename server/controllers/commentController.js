import * as db from '../utils/dbUtils';
import {validateComment} from '../validation/validateComment';
import * as code from '../constants/codeResponse';
import * as mistakes from '../constants/mistakeMessages';
import io from '../socket/io'

export const checkCreateDataComment = async(req, res, next) => {

    const {text, id, creator} = req.body;
    if(validateComment({text},res)){
        try {
            req.article = {id};
            req.comment = {text, creator};
            return next();
        } catch (error) {
            res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
        }
    }
}

export const createComment = async(req, res) => {

    const article = req.article;
    const comment = req.comment;
    try {
        const newComment = await db.createComment({id: article.id, text: comment.text, creator: comment.creator});
        let comments = Object.values(io.sockets.connected).filter(obj => {
            if(!obj.userId && obj.userId === req.id) {
                return obj;
            }
        })
        comments.forEach((socket) => {
            socket.emit('getNewComment', {id: newComment._id,text: newComment.text, id_article: article.id, owner: newComment.creator})
        })
        res.send(code.CODE_200, {id: newComment._id,text: newComment.text, owner: newComment.creator});
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}

export const getArticleComments = async(req, res) => {
    const idArticle = req.params.id;

    try {
        let comments = await db.findComments({id: idArticle});
        comments = comments.map((obj) => ({id: obj._id,text: obj.text, owner: obj.creator}));
        res.send(code.CODE_200, comments)
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}