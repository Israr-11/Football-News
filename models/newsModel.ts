import mongoose, { Schema, Document } from 'mongoose';
import { Article } from '../interfaces/index';

export interface NewsDocument extends Article, Document { }

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    url: {
        type: String,
        required: true,
        unique: true
    },
    
    source: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const News = mongoose.model<NewsDocument>('football_news', NewsSchema);
