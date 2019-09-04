import express from 'express';
import * as auth from '../controllers/authController';
import * as article from '../controllers/articleController';
import * as token from '../controllers/tokenController';
import * as route from '../constants/routes';
import * as comment from '../controllers/commentController';

const router = express.Router();

router.post(route.SIGNUP, [auth.checkUniqUserInDb,auth.createUserInDb,token.createToken]);

router.post(route.SIGNIN, [auth.checkValidateUserData,auth.checkExistenceUser,token.createToken]);

router.post(route.CHECKTOKEN,[token.checkValidateToken, auth.me]);

router.get(route.ARTICLELIST, [token.checkValidateToken,article.getLimitArticleData]);

router.post(route.ARTICLELIST, [token.checkValidateToken, article.checkCreateDataArticle, article.createArticle]);

router.get(route.ARTICLELIST_ID, [token.checkValidateToken,article.getArticle]);

router.put(route.ARTICLELIST_ID, [token.checkValidateToken,article.checkEditDataArticle,article.editArticle]);

router.post(route.COMMENT,[token.checkValidateToken, comment.checkCreateDataComment, comment.createComment]);

router.get(route.ARTICLE_COMMENTS_ID, [token.checkValidateToken,comment.getArticleComments])

export default router;