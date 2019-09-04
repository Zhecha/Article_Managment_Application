import * as Joi from "joi";
import {ArticleLimits} from './limitations';

export  const validateArticle = (article, res) => {
    return Joi.validate(article, ArticleLimits, (err, value) => {
        if (err) {
            const message = err.details[0].message;
            res.statusCode = 400;
            res.send({message});
            return false;
        }
        return true;
    })
}