import * as API from '../utils/api'
import uuidv4 from 'uuid'
import * as types from './types'

export const fetchCategories = () => (dispatch, getState) => {
    const state = getState()
    if (state.categories.isFetched === false) {
        return API
            .fetchCategories()
            .then(categories => dispatch({
                type: types.RECEIVE_CATEGORIES,
                categories
            }))
    }
};

export const fetchPosts = () => (dispatch, getState) => {
    const state = getState()
    if (state.posts.isFetched === false) {
        return API
            .fetchPosts()
            .then(posts => dispatch({
                type: types.RECEIVE_POSTS,
                posts
            }))
    }
};

export const votePost = (post, option) => (dispatch) => {
    return API.votePost(post, option).then(res => dispatch({
        type: types.VOTE_POST,
        post: res
    }))
}

export const fetchComments = (post) => (dispatch, getState) => {
    const state = getState()
    if (state.posts.items[post.id].comments === undefined) {
        return API.fetchComments(post).then(comments => dispatch({
            type: types.RECEIVE_COMMENTS,
            post,
            comments
        }))
    }
}

export const voteComment = (comment, option) => (dispatch) => {
    return API.voteComment(comment, option).then(res => dispatch({
        type: types.VOTE_COMMENT,
        comment: res
    }))
}

export const toggleAddPost = () => (dispatch) => {
    return dispatch({
        type: types.TOGGLE_ADD_POST
    })
}

export const addPost = (post) => (dispatch) => {
    post.id = uuidv4()
    post.timestamp = Date.now()
    return API.addPost(post).then(res => dispatch({
        type: types.ADD_POST,
        post: res
    }))
}

export const editPost = (post, data) => (dispatch) => {
    return API.editPost(post, data.title, data.body).then(res => dispatch({
        type: types.EDIT_POST,
        post: res
    }))
}

export const deletePost = (post) => (dispatch) => {
    if (window.confirm("Do you really want to delete?")) {
        return API.deletePost(post).then(res => dispatch({
            type: types.DELETE_POST,
            post: post
        }))
    }
}

export const addComment = (post, comment) => (dispatch) => {
    comment.id = uuidv4()
    comment.timestamp = Date.now()
    comment.parentId = post.id
    return API.addComment(comment).then(res => dispatch({
        type: types.ADD_COMMENT,
        comment: res
    }))
}

export const editComment = (comment, data) => (dispatch) => {
    return API.editComment(comment, Date.now(), data.body).then(res => dispatch({
        type: types.EDIT_COMMENT,
        comment: res
    }))
}

export const deleteComment = (comment) => (dispatch) => {
    if (window.confirm("Do you really want to delete?")) {
        return API.deleteComment(comment).then(res => dispatch({
            type: types.DELETE_COMMENT,
            comment: comment
        }))
    }
}