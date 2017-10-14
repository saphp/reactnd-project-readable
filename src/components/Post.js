import React, { Component } from 'react'
import { connect } from 'react-redux'
import Voter from './Voter'
import CommentsList from './CommentsList'
import EditPost from './EditPost'
import AddComment from './AddComment'
import { votePost } from '../actions'
import Moment from 'react-moment'
import { map, size } from 'lodash'

class Post extends Component {
	getPost() {
		if (this.props.posts.isFetched) {
			return this.props.posts.items[this.props.match.params['post_id']]
		}
		return false
	}
	render() {
		const post = this.getPost()
		return (
			<div>
				<div className="card border-dark mb-3">
					<div className="card-body text-dark" style={{ padding: '1.25rem' }}>
						<h5 className="card-title">
							<Voter action={votePost} item={post} />
							<span style={{ marginLeft: '.75rem' }}>{post.title}</span>
						</h5>
						<p className="card-text">{ post.body }</p>
					</div>
					<div className="card-footer">
						<small className="text-muted">submitted <Moment fromNow>{post.timestamp}</Moment> by {post.author}</small>
						<div className="float-right">
							<EditPost post={post} backToPost={() => { this.props.history.push(`/${post.category}/${post.id}`) }} backToHome={() => { this.props.history.push(`/`) }} editPostWindow={post && this.props.match.params['action'] === 'edit'} />
						</div>
					</div>
				</div>
				{ size(post.comments) > 0 && <CommentsList post={post} backToPost={() => { this.props.history.push(`/${post.category}/${post.id}`) }} selectedComment={this.props.match.params['comment_id']} editCommentWindow={post && this.props.match.params['action'] === 'editcomment'} comments={map(post.comments)} />}
				<AddComment post={post} />
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	posts: state.posts,
})

export default connect(mapStateToProps)(Post)