import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'REVEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
});

export const fetchCategories = () => (dispatch, getState) => {
	const state = getState()
	if (state.categories.isFetched === false) {
		return API
			.fetchCategories()
			.then(categories => dispatch(receiveCategories(categories)))
	}
};

export const receivePosts = posts => ({
	type: RECEIVE_POSTS,
	posts
});

export const fetchPosts = () => (dispatch, getState) => {
	const state = getState()
	if (state.posts.isFetched === false) {
		return API
			.fetchPosts()
			.then(posts => dispatch(receivePosts(posts)))
	}
};