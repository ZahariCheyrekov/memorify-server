import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    url: String,
    name: String,
    creatorId: String,
    comments: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const CardSchema = mongoose.model('CardSchema', cardSchema);
export default CardSchema;