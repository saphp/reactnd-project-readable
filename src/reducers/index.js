import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES } from '../actions'

function categories (state = {isFetched: false, items: []}, action) {
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

function posts (state = {}, action) {
	return state
}

function comments (state = {}, action) {
	return state
}

export default combineReducers({
	categories,
	posts,
	comments,
})