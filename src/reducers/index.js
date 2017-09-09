import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, VOTE_POST, RECEIVE_COMMENTS, VOTE_COMMENT } from '../actions'
import mapKeys from 'lodash/mapKeys'

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
				items: mapKeys(action.posts, 'id')
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
		default:
			return state
	}
}

function comments (state = {}, action) {
	return state
}

export default combineReducers({
	categories,
	posts,
	comments,
})