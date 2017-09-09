import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, VOTE_POST, RECEIVE_COMMENTS } from '../actions'
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
						comments: action.comments
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