import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { toggleAddPost, addPost } from '../actions'
import serialize from 'form-serialize'

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.props.dispatch(toggleAddPost());
  }

  handleSubmit(e) {
    e.preventDefault();
    const post = serialize(e.target, { hash: true })
    this.props.dispatch(addPost(post))
    this.toggle()
  }

  render() {
    return (
      <div>
          <Button color="primary" block onClick={this.toggle}>Add New Post</Button>
            <Modal isOpen={this.props.addPostWindow} toggle={this.toggle} size="lg">
              <ModalHeader toggle={this.toggle}>Add New Post</ModalHeader>
              <Form onSubmit={this.handleSubmit} id="add-post">
                <ModalBody>
                    <FormGroup>
                      <Label for="titleField">Post Title</Label>
                      <Input type="text" name="title" id="titleField" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="authorField">Post Author</Label>
                      <Input type="text" name="author" id="authorField" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="categoryField">Category</Label>
                      <Input type="select" name="category" id="categoryField">
                        {this.props.categories.map((category) => (
                          <option key={category.path}>{category.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="bodyField">Body</Label>
                      <Input type="textarea" name="body" id="bodyField" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary">Add Post</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories.items,
  addPostWindow: state.utils.addPostWindow,
});

export default connect(mapStateToProps)(AddPost);