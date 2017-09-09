import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'REVEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

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