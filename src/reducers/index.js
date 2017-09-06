import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions'

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
				items: action.posts
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