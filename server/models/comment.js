import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: 'text is required'
    },
    owner : { 
        type: Schema.Types.ObjectId, 
        ref: 'ArticleList' 
    },
    creator: {
        type: String,
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

