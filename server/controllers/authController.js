import {validateUser} from '../validation/validateUser';
import bcrypt from 'bcryptjs';
import * as db from '../utils/dbUtils';
import * as code from '../constants/codeResponse';
import * as mistakes from '../constants/mistakeMessages';
import * as jwtToken from '../constants/jwtConstants';

export const checkUniqUserInDb = async(req, res, next) => {
    const user = req.body;
    if(validateUser(user,res)) {
        try {
            const {login, email} = req.body;

            const user = await db.findUserByLogin({login});
            if(!user) {
                const user = await db.findUserByEmail({email});
                if(!user) {
                    req.user = req.body;
                    return next();
                } else {
                    const message = mistakes.LOGIN_OR_EMAIL_CREATED;
                    res.status(code.CODE_400).send({message});
                }
            } else {
                const message = mistakes.LOGIN_OR_EMAIL_CREATED;
                res.status(code.CODE_400).send({message});
            }
        } catch (error) {
            res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
        }
    }
}

export const createUserInDb = async(req, res, next) => {
    
    const {login, email, password} = req.user;
    bcrypt.hash(password, jwtToken.SALT_ROUNDS, async(err, hash) => {
        if(err) {
            res.status(code.CODE_500).send(mistakes.FAIL_HASH);
        } else {
            try {
                const user = await db.createUser({login, email, password: hash});
                console.log("User created");
                req.user = user;
                return next();
            } catch (error) {
                res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
            }
        }
    });
}

export const checkValidateUserData = async(req, res, next) => {
    const user = req.body;
    if(validateUser(user,res)){
        try {
            req.user = user;
            return next();
        } catch (error) {
            res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
        }
    }
}


export const checkExistenceUser = async(req, res, next) => {
    const {login, email, password} = req.user;
    try {
        const user = await db.findUserByLoginAndEmail({login, email});
        if(!user){
            const message = mistakes.INVALID_LOGIN_OR_EMAIL;
            res.status(code.CODE_404).send({message});
        } else {
            bcrypt.compare(password,user.password, (err,success) => {
                if(!success) {
                    const message = mistakes.INVALID_PASSWORD;
                    res.status(code.CODE_404).send({message});
                } else {
                    req.user = user;
                    return next();
                }
            });
        }
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}

export const me = async(req, res) => {
    const idUser = req.id;
    try {
        const user = await db.findUser({ _id: idUser });
        res.status(code.CODE_200).send({id: user._id, login: user.login, email: user.email})
    } catch (error) {
        res.status(code.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}

