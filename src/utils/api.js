const api = 'http://localhost:5001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Accept': 'application/json',
	'Authorization': token
}

export function fetchCategories() {
	return fetch(`${api}/categories`, { headers })
		.then(res => res.json())
		.then(data => data.categories)
}

export function fetchPosts() {
	return fetch(`${api}/posts`, { headers })
		.then(res => res.json())
		.then(posts => posts)
}

export function votePost(post, option) {
	return fetch(`${api}/posts/${post.id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	}).then(res => res.json())
}

export function fetchComments (post) {
	return fetch(`${api}/posts/${post.id}/comments`, { headers })
		.then(res => res.json())
		.then(data => data)
}