import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { addComment } from '../actions'
import serialize from 'form-serialize'

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = serialize(e.target, { hash: true })
    this.props.dispatch(addComment(this.props.post, comment))
    window.scrollTo(0, 0)
    e.target.author.value = ''
    e.target.body.value = ''
  }

  render() {
      return (
          <div>
              <div className="card border-dark mb-3">
                  <div className="card-body text-dark" style={{ padding: '1.25rem' }}>
                      <h5 className="card-title">
                          Add New Comment
                      </h5>
                      <div className="card-text">
                        <Form onSubmit={this.handleSubmit} id="add-comment">
                              <FormGroup>
                                <Label for="authorField">Your Name</Label>
                                <Input type="text" name="author" id="authorField" />
                              </FormGroup>
                              <FormGroup>
                                <Label for="bodyField">Your Comment</Label>
                                <Input type="textarea" name="body" id="bodyField" />
                              </FormGroup>
                            <Button color="primary">Add Comment</Button>
                        </Form>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}

export default connect()(AddComment);