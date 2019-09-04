import * as Joi from "joi";

export const UsersLimits = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

export const ArticleLimits = Joi.object().keys({
    title: Joi.string().alphanum().min(1).required(),
    body: Joi.string().alphanum().min(1).required()
})

export const CommentLimits = Joi.object().keys({
    text: Joi.string().min(5).required()
})
