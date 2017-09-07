import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'

class PostsList extends Component {
	render() {
		const category = this.props.match.params['category']
		let posts = this.props.posts
		if (category) {
			posts = this.props.posts.filter((post) => post.category === category)
		}
		return (
			<div>
				<h5>Posts</h5>
				{posts.map((post) => (
					<PostItem key={post.id} post={post} />
				))}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	posts: state.posts.items,
})

export default connect(mapStateToProps)(PostsList);