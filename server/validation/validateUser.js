import * as Joi from "joi";
import {UsersLimits} from './limitations';

export const validateUser = (user, res) => {
    return Joi.validate(user, UsersLimits, (err, value) => {
        if (err) {
            const message = err.details[0].message;
            res.statusCode = 400;
            res.send({message});
            return false;
        }
        return true;
    })
}