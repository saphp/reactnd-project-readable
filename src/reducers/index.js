import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, VOTE_POST, RECEIVE_COMMENTS, VOTE_COMMENT, TOGGLE_ADD_POST, ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions'
import { mapKeys, omit } from 'lodash'

function categories (state = { isFetched: false, items: [] }, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                isFetched: true,
                items: action.categories
            }
        default:
            return state
    }
}

function posts (state = { isFetched: false, items: [] }, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetched: true,
                items: mapKeys(action.posts.filter((p) => p.deleted === false), 'id')
            }
        case ADD_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: action.post
                }
            }
        case EDIT_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: {
                        ...state.items[action.post.id],
                        title: action.post.title,
                        body: action.post.body
                    }
                }
            }
        case DELETE_POST:
            return {
                ...state,
                items: omit(state.items, action.post.id)
            }
        case VOTE_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: {
                        ...state.items[action.post.id],
                        voteScore: action.post.voteScore
                    }
                }
            }
        case RECEIVE_COMMENTS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: {
                        ...state.items[action.post.id],
                        comments: mapKeys(action.comments, 'id')
                    }
                }
            }
        case VOTE_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.parentId]: {
                        ...state.items[action.comment.parentId],
                        comments: {
                            ...state.items[action.comment.parentId].comments,
                            [action.comment.id]: {
                                ...state.items[action.comment.parentId].comments[action.comment.id],
                                voteScore: action.comment.voteScore
                            }
                        }
                    }
                }
            }
        case ADD_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.parentId]: {
                        ...state.items[action.comment.parentId],
                        comments: {
                            ...state.items[action.comment.parentId].comments,
                            [action.comment.id]: action.comment
                        }
                    }
                }
            }
        case EDIT_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.parentId]: {
                        ...state.items[action.comment.parentId],
                        comments: {
                            ...state.items[action.comment.parentId].comments,
                            [action.comment.id]: {
                                ...state.items[action.comment.parentId].comments[action.comment.id],
                                body: action.comment.body,
                                timestamp: action.comment.timestamp
                            }
                        }
                    }
                }
            }
        case DELETE_COMMENT:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.comment.parentId]: {
                        ...state.items[action.comment.parentId],
                        comments: omit(state.items[action.comment.parentId].comments, action.comment.id)
                    }
                }
            }
        default:
            return state
    }
}

function utils (state = { addPostWindow: false }, action) {
    switch (action.type) {
        case TOGGLE_ADD_POST:
            return {
                ...state,
                addPostWindow: !state.addPostWindow
            }
        default:
            return state
    }
}

export default combineReducers({
    categories,
    posts,
    utils,
})