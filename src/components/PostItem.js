import React, { Component } from 'react'
import { Row, Col, ButtonGroup, Button } from 'reactstrap'
import { FaAngleUp, FaAngleDown } from 'react-icons/lib/fa'

class PostItem extends Component {
	render() {
		const { post } = this.props
		return (
			<Row>
				<Col xs="1">
					<ButtonGroup vertical>
						<Button color="success" size="sm"><FaAngleUp /></Button>
						<Button disabled>{post.voteScore}</Button>
						<Button color="danger" size="sm"><FaAngleDown /></Button>
					</ButtonGroup>
				</Col>
				<Col xs="11">
					<h5>{post.title}</h5>
				</Col>
			</Row>
		)
	}
}

export default PostItem