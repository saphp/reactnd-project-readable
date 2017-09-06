import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h5>Categories</h5>
        <ul>
          { this.props.categories.map((category) => (
            <li key={category.path}>{ category.name }</li>
          ))}
        </ul>
        <h5>Posts</h5>
        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories.items,
  posts: state.posts.items,
});

export default connect(mapStateToProps)(App);
