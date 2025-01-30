import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    title: { type: String },
    description: { type: String },
    photos: {
        admin_id: { type: String, required: true },
        url: { type: String, required: true },
    },
}, { timestamps: true });


export const Posts = mongoose.models.Posts || model("Posts", schema) 