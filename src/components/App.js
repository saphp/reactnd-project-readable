import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
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
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(App);
