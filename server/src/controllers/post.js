import mongoose from "mongoose";
import { TryCatch } from "../middleware/error.js";
import { Posts } from "../models/posts.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/features.js";
import { myCache } from "../../app.js";
import { TTL } from "../../app.js";

const createPost = TryCatch(async (req, res) => {
    const { title, description } = req.body;

    const photos = req.files;

    if (!photos) return new Error("Please upload photos", 400);

    if (!title || !description) return new Error("Please enter all fields");

    const photosUrl = await uploadToCloudinary(photos);

    const post = await Posts.create({ title, description, photos: photosUrl });

    return res
        .status(201)
        .json({ success: true, message: "Post created successfully" });
});

const getAllPosts = TryCatch(async (req, res, next) => {

    const cachedPosts = myCache.get("allPosts")

    if (cachedPosts) {
        return res.status(200).json({ success: true, posts: cachedPosts });
    }
    const posts = await Posts.find({});
    myCache.set("allPosts", posts, TTL);

    return res.status(200).json({ success: true, posts });
});

const getSinglePost = TryCatch(async (req, res, next) => {
    const { postId } = req.params;
    const post = await Posts.findById(postId);

    if (!post) next(new Error("Post dees not Exist", 400));

    return res.status(200).json({ success: true, post });
});

const deleteImage = TryCatch(async (req, res, next) => {
    const { imageId, postId } = req.query;
    const objectId = new mongoose.Types.ObjectId(postId);

    const post = await Posts.findById(objectId);

    if (!post) return next(new Error("Post not found", 404));

    await deleteFromCloudinary(imageId);

    post.photos = post.photos.filter((i) => i.public_id !== imageId);

    await post.save();

    return res
        .status(200)
        .json({ success: true, message: "Image deleted successfully" });
});

const updatePost = TryCatch(async (req, res, next) => {
    const { postId } = req.params;

    const { title, description } = req.body;
    console.log(postId + " " + title + " " + description)
    const photos = req.files;

    const post = await Posts.findById(postId);

    if (!post) return next(new Error("Post not found", 404));

    if (title) {
        post.title = title;
    }

    if (description) {
        post.description = description;
    }

    if (photos && photos.length > 0) {
        const ids = await uploadToCloudinary(photos);
        post.photos.push(...ids);
    }

    await post.save();

    return res
        .status(200)
        .json({ success: true, message: "Post updated successfully" });
});

const deletePost = TryCatch(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Posts.findById(postId);

    if (!post) return next(new Error("Post does not exist", 400));
    const ids = post.photos.map((i) => i.public_id)
    await deleteFromCloudinary(ids)
    await Posts.deleteOne({ _id: postId });

    return res
        .status(200)
        .json({ success: true, message: "post deleted successfully" });
});

export {
    createPost,
    getAllPosts,
    getSinglePost,
    deleteImage,
    deletePost,
    updatePost,
};
