import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'REVEIVE_CATEGORIES'

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
});

export const fetchCategories = () => dispatch => (
	API
		.fetchCategories()
		.then(categories => dispatch(receiveCategories(categories)))
);