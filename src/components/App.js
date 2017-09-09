import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchComments } from '../actions'
import { Container, Row, Col, Button } from 'reactstrap'
import { Route, withRouter } from 'react-router-dom'
import PostsList from './PostsList'
import Navigation from './Navigation'
import Post from './Post'
import map from 'lodash/map'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  render() {
    if (this.props.posts) {
      map(this.props.posts, (post) => {
        this.props.dispatch(fetchComments(post))
      })
    }
    return (
      <div className="app">
        <Navigation />
        <Container>
          <Row>
            <Col sm="10">
              <Route exact path="/" component={PostsList} />
              <Route exact path="/:category" component={PostsList} />
              <Route path="/:category/:post_id" component={Post} />
            </Col>
            <Col sm="2">
              <Button color="primary" block>Add New Post</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories.items,
  posts: state.posts.items,
});

export default withRouter(connect(mapStateToProps)(App));
