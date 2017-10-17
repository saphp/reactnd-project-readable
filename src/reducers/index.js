import { combineReducers } from 'redux'
import * as types from '../actions/types'
import { mapKeys, omit } from 'lodash'

function categories (state = { isFetched: false, items: [] }, action) {
    switch (action.type) {
        case types.RECEIVE_CATEGORIES:
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
        case types.RECEIVE_POSTS:
            return {
                ...state,
                isFetched: true,
                items: mapKeys(action.posts.filter((p) => p.deleted === false), 'id')
            }
        case types.ADD_POST:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.post.id]: action.post
                }
            }
        case types.EDIT_POST:
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
        case types.DELETE_POST:
            return {
                ...state,
                items: omit(state.items, action.post.id)
            }
        case types.VOTE_POST:
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
        case types.RECEIVE_COMMENTS:
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
        case types.VOTE_COMMENT:
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
        case types.ADD_COMMENT:
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
        case types.EDIT_COMMENT:
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
        case types.DELETE_COMMENT:
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
        case types.TOGGLE_ADD_POST:
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