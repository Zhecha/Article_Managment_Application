import * as Joi from "joi";
import {CommentLimits} from './limitations';

export  const validateComment = (comment, res) => {
    return Joi.validate(comment, CommentLimits, (err, value) => {
        if (err) {
            const message = err.details[0].message;
            res.statusCode = 400;
            res.send({message});
            return false;
        }
        return true;
    })
}