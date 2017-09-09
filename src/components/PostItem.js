import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { votePost } from '../actions'
import { Link } from 'react-router-dom'
import Voter from './Voter'
import Moment from 'react-moment'

class PostItem extends Component {
	render() {
		const { post } = this.props
		return (
			<div>
				<div className="card border-dark mb-3">
					<div className="card-body text-dark" style={{ padding: '1.25rem' }}>
						<h5 className="card-title">
							<Voter action={votePost} item={post} />
							<Link style={{ marginLeft: '.75rem' }} to={`/${post.category}/${post.id}`}>{post.title}</Link>
						</h5>
					</div>
					<div className="card-footer">
						<small className="text-muted">submitted <Moment fromNow>{post.timestamp}</Moment> by { post.author }</small>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(PostItem)