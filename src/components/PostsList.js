import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import map from 'lodash/map'
import sortBy from 'sort-by'

class PostsList extends Component {
	constructor(props) {
		super(props);

		this.handleSorting = this.handleSorting.bind(this);
		this.state = {
			sortedBy: '-timestamp'
		};
	}

	handleSorting(e) {
		this.setState({ sortedBy: e.target.value})
	}

	render() {
		const category = this.props.match.params['category']
		let posts = this.props.posts
		if (category) {
			posts = this.props.posts.filter((post) => post.category === category)
		}
		return (
			<div>
				<h5>
					Posts
					<div className="float-right">
						<small>
							<form className="form-inline">
								<label>Sort By:</label>
								<select className="form-control" onChange={this.handleSorting} value={this.state.sortedBy}>
									<option value="-timestamp">Newest Items</option>
									<option value="timestamp">Oldest Items</option>
									<option value="-voteScore">Highest Votes</option>
									<option value="voteScore">Lowest Votes</option>
								</select>
							</form>
						</small>
					</div>
					<div className="clearfix"></div>
				</h5>
				{posts.sort(sortBy(this.state.sortedBy)).map((post) => (
					<PostItem key={post.id} post={post} />
				))}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	posts: map(state.posts.items),
})

export default connect(mapStateToProps)(PostsList);