import * as API from '../utils/api'
import uuidv4 from 'uuid'

export const RECEIVE_CATEGORIES = 'REVEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const fetchCategories = () => (dispatch, getState) => {
    const state = getState()
    if (state.categories.isFetched === false) {
        return API
            .fetchCategories()
            .then(categories => dispatch({
                type: RECEIVE_CATEGORIES,
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
                type: RECEIVE_POSTS,
                posts
            }))
    }
};

export const votePost = (post, option) => (dispatch) => {
    return API.votePost(post, option).then(res => dispatch({
        type: VOTE_POST,
        post: res
    }))
}

export const fetchComments = (post) => (dispatch, getState) => {
    const state = getState()
    if (state.posts.items[post.id].comments === undefined) {
        return API.fetchComments(post).then(comments => dispatch({
            type: RECEIVE_COMMENTS,
            post,
            comments
        }))
    }
}

export const voteComment = (comment, option) => (dispatch) => {
    return API.voteComment(comment, option).then(res => dispatch({
        type: VOTE_COMMENT,
        comment: res
    }))
}

export const toggleAddPost = () => (dispatch) => {
    return dispatch({
        type: TOGGLE_ADD_POST
    })
}

export const addPost = (post) => (dispatch) => {
    post.id = uuidv4()
    post.timestamp = Date.now()
    return API.addPost(post).then(res => dispatch({
        type: ADD_POST,
        post: res
    }))
}

export const editPost = (post, data) => (dispatch) => {
    return API.editPost(post, data.title, data.body).then(res => dispatch({
        type: EDIT_POST,
        post: res
    }))
}

export const deletePost = (post) => (dispatch) => {
    if (window.confirm("Do you really want to delete?")) {
        return API.deletePost(post).then(res => dispatch({
            type: DELETE_POST,
            post: post
        }))
    }
}

export const addComment = (post, comment) => (dispatch) => {
    comment.id = uuidv4()
    comment.timestamp = Date.now()
    comment.parentId = post.id
    return API.addComment(comment).then(res => dispatch({
        type: ADD_COMMENT,
        comment: res
    }))
}

export const editComment = (comment, data) => (dispatch) => {
    return API.editComment(comment, Date.now(), data.body).then(res => dispatch({
        type: EDIT_COMMENT,
        comment: res
    }))
}

export const deleteComment = (comment) => (dispatch) => {
    if (window.confirm("Do you really want to delete?")) {
        return API.deleteComment(comment).then(res => dispatch({
            type: DELETE_COMMENT,
            comment: comment
        }))
    }
}