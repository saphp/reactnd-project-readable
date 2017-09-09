import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'reactstrap'
import { FaAngleUp, FaAngleDown } from 'react-icons/lib/fa'

class Voter extends Component {
	handleVoting(option) {
		const { dispatch, item, action } = this.props
		dispatch(action(item, option));
	}

	render() {
		return (
			<ButtonGroup vertical>
				<Button outline color="success" size="sm" onClick={() => this.handleVoting("upVote")}><FaAngleUp /></Button>
				<Button disabled size="sm">{this.props.item.voteScore}</Button>
				<Button outline color="danger" size="sm" onClick={() => this.handleVoting("downVote")}><FaAngleDown /></Button>
			</ButtonGroup>
		)
	}
}

export default connect()(Voter)