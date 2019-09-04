import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleListSchema = new Schema({
    title: {
        type: String,
        required: 'title is required'
    },
    body: {
        type: String,
        required: 'body is required'
    },
    dateCreated: {
        type: String,
    },
    dateUpdated: {
        type: String,
    },
    public: {
        type: Boolean,
    },
    private: {
        type: Boolean,
    },
    creator : { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
},{strict: true});


const ArticleList  = mongoose.model('ArticleList', ArticleListSchema);

