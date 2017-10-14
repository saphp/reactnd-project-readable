import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { editComment, deleteComment } from '../actions'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'
import { FaEdit, FaTrashO } from 'react-icons/lib/fa'

class EditComment extends Component {
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
    this.props.dispatch(editComment(this.props.comment, data))
    this.toggle()
  }

  handleDelete() {
    this.props.dispatch(deleteComment(this.props.comment))
  }

  render() {
    const { post, comment, editCommentWindow } = this.props
    return (
      <div>
          <Link to={`/${post.category}/${post.id}/editcomment/${comment.id}`} className="btn btn-primary btn-sm"><FaEdit /> Edit Comment</Link>{ ' ' }
          <Button size="sm" color="danger" onClick={this.handleDelete}><FaTrashO /> Delete Comment</Button>
            <Modal isOpen={editCommentWindow} toggle={this.toggle} size="lg">
              <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
              <Form onSubmit={this.handleSubmit} id="add-post">
                <ModalBody>
                    <FormGroup>
                      <Label for="authorField">Your Name</Label>
                      <Input type="text" name="author" disabled id="authorField" defaultValue={comment.author} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bodyField">Your Comment</Label>
                      <Input type="textarea" name="body" id="bodyField" defaultValue={comment.body} />
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

export default connect()(EditComment);