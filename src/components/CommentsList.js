import React, { Component } from 'react'
import sortBy from 'sort-by'
import CommentItem from './CommentItem'

class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.handleSorting = this.handleSorting.bind(this);
        this.state = {
            sortedBy: '-timestamp'
        };
    }

    handleSorting(e) {
        this.setState({ sortedBy: e.target.value })
    }

    render() {
        return (
            <div>
                <h6>
                    Comments ({this.props.comments.length}):
                    <div className="float-right">
                        <small>
                            <form className="form-inline">
                                <label>Sort By:</label>
                                <select className="form-control" onChange={this.handleSorting} value={this.state.sortedBy}>
                                    <option value="-timestamp">Newest Comments</option>
                                    <option value="timestamp">Oldest Comments</option>
                                    <option value="-voteScore">Highest Votes</option>
                                    <option value="voteScore">Lowest Votes</option>
                                </select>
                            </form>
                        </small>
                    </div>
                    <div className="clearfix"></div>
                </h6>
                {this.props.comments.sort(sortBy(this.state.sortedBy)).map((comment) => (
                    <CommentItem key={comment.id} comment={comment} post={this.props.post} backToPost={this.props.backToPost} editCommentWindow={this.props.editCommentWindow && this.props.selectedComment === comment.id}  />
                ))}
            </div>
        )
    }
}

export default CommentsList