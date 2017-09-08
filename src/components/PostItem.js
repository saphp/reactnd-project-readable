import React, { Component } from 'react'
import { Row, Col, ButtonGroup, Button } from 'reactstrap'
import { FaAngleUp, FaAngleDown } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { votePost } from '../actions'

class PostItem extends Component {
	handleVoting(option) {
		const { dispatch, post } = this.props
		dispatch(votePost(post, option));
	}
	render() {
		const { post } = this.props
		return (
			<Row>
				<Col xs="1">
					<ButtonGroup vertical>
						<Button color="success" size="sm" onClick={() => this.handleVoting("upVote")}><FaAngleUp /></Button>
						<Button disabled>{post.voteScore}</Button>
						<Button color="danger" size="sm" onClick={() => this.handleVoting("downVote")}><FaAngleDown /></Button>
					</ButtonGroup>
				</Col>
				<Col xs="11">
					<h5>{post.title}</h5>
				</Col>
			</Row>
		)
	}
}

export default connect()(PostItem)