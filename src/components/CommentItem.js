import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteComment } from '../actions'
import Voter from './Voter'
import Moment from 'react-moment'

class CommentItem extends Component {
	render() {
		const { comment } = this.props
		return (
			<div>
				<div className="card border-dark mb-3">
					<div className="card-body text-dark" style={{ padding: '1.25rem' }}>
						<div className="card-text">
							<Voter action={voteComment} item={comment} />
							<span style={{ marginLeft: '.75rem' }}>{comment.body}</span>
						</div>
					</div>
					<div className="card-footer">
						<small className="text-muted">submitted <Moment fromNow>{comment.timestamp}</Moment> by {comment.author }</small>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(CommentItem)