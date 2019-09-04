import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        required: 'login is required'
    },
    password: {
        type: String,
        required: 'password is required'
    },
    email: {
        type: String,
        required: 'email is required'
    },
    articleLists : [{ type: Schema.Types.ObjectId, ref: 'ArticleList' }]
});


const User  = mongoose.model('User', UserSchema);

