import * as db from '../utils/dbUtils';
import jwt from 'jsonwebtoken';
import * as codes from '../constants/codeResponse';
import * as mistakes from '../constants/mistakeMessages';
import * as jwtToken from '../constants/jwtConstants';

export const createToken = async(req, res) => {
    try {
        let user = await db.findUser(req.user);
        const token = jwt.sign(
            {
                id: user._id
            },
            jwtToken.SECRET,
            { expiresIn: jwtToken.EXPIRE_IN }
        );
        user = {id: user._id, login: user.login, email: user.email};
        res.status(codes.CODE_200).send({token,user});
    } catch (error) {
        res.status(codes.CODE_500).send(mistakes.FAIL_REQUEST_TO_DB);
    }
}


export const checkValidateToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (!token) {
        const isInvalidToken = true;
        const message = mistakes.NO_TOKEN_PROVIDED;
        res.status(codes.CODE_403).send({isInvalidToken});
    } else {
        jwt.verify(token, jwtToken.SECRET, (err, decoded) => {
            if (err) {
                const isInvalidToken = true;
                const error = err;
                const message = mistakes.INVALID_TOKEN;
                res.status(codes.CODE_403).send({isInvalidToken});
            } else {
                req.id = decoded.id;
                next();
            }
        });
    }
}