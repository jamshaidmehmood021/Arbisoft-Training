import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { sub } from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const STATUS = Object.freeze({
    IDLE: "idle",
    ERROR: 'error',
    LOADING: "loading",
    SUCCESS: 'success'
});

const initialState = {
    posts: [],
    status: STATUS.IDLE,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

// for adding new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                };
            }
        },
        reactionsAddition(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;

                // Filter out duplicate posts
                const existingIds = new Set(state.posts.map(post => post.id));
                const loadedPosts = action.payload
                    .filter(post => !existingIds.has(post.id))
                    .map(post => {
                        post.date = sub(new Date(), { minutes: 1 }).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        };
                        return post;
                    });

                // Add unique posts to the array
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
            
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getAllPostsStatusses = (state) => state.posts.status;
export const { addPost, reactionsAddition } = postSlice.actions;

export default postSlice.reducer;
