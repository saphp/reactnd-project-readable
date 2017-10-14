import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { editPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggle() {
    this.props.backToPost()
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = serialize(e.target, { hash: true })
    this.props.dispatch(editPost(this.props.post, data))
    this.toggle()
  }

  handleDelete() {
    this.props.dispatch(deletePost(this.props.post))
    this.props.backToHome()
  }

  render() {
    const { post, editPostWindow } = this.props
    return (
      <div>
          <Link to={`/${post.category}/${post.id}/edit`} className="btn btn-primary btn-sm"><FaEdit /> Edit Post</Link>{ ' ' }
          <Button size="sm" color="danger" onClick={this.handleDelete}><FaTrashO /> Delete Post</Button>
            <Modal isOpen={editPostWindow} toggle={this.toggle} size="lg">
              <ModalHeader toggle={this.toggle}>Edit Post</ModalHeader>
              <Form onSubmit={this.handleSubmit} id="add-post">
                <ModalBody>
                    <FormGroup>
                      <Label for="titleField">Post Title</Label>
                      <Input type="text" name="title" id="titleField" defaultValue={post.title} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bodyField">Body</Label>
                      <Input type="textarea" name="body" id="bodyField" defaultValue={post.body} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary">Edit Post</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>
      </div>
    );
  }
}

export default connect()(EditPost);