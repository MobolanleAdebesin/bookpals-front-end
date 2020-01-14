import React, { Component } from "react";
import "./Modal.css";
import Axios from "axios";
import Button from "@material-ui/core/Button";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      desc: this.props.desc,
      auth: this.props.auth,
      pub: this.props.pub,
      isbn10: this.props.isbn10,
      isbn13: this.props.isbn13,
      image: this.props.image,
      id: this.props.id
    };
  }
  handleHide = evt => {
    evt.preventDefault();
    this.props.hideModal();
  };

  titleChange = evt => {
    this.setState({ title: evt.target.value });
  };

  descChange = evt => {
    this.setState({ desc: evt.target.value });
  };

  authChange = evt => {
    this.setState({ auth: evt.target.value });
  };

  publisherChange = evt => {
    this.setState({ pub: evt.target.value });
  };

  isbn10Change = evt => {
    this.setState({ isbn10: evt.target.value });
  };
  isbn13Change = evt => {
    this.setState({ isbn13: evt.target.value });
  };
  imageChange = evt => {
    this.setState({ image: evt.target.value });
  };

  submitEdits = () => {
    Axios.put(`https://bola-api.herokuapp.com/books/id/${this.state.id}`, {
      title: this.state.title,
      description: this.state.desc,
      author: this.state.auth,
      publisher: this.state.pub,
      isbns: [{ isbn10: this.state.isbn10, isbn13: this.state.isbn13 }],
      image: this.state.image
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="Modal">
        <form className="form">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="title"
              placeholder="Title"
              defaultValue={this.state.title}
              onChange={this.titleChange}
            />
            <label htmlFor="exampleInputEmail1">Book Description</label>
            <input
              type="textarea"
              className="form-control"
              aria-describedby="bookDescription"
              placeholder="Book Description"
              defaultValue={this.state.desc}
              onChange={this.descChange}
            />
            <label htmlFor="exampleInputEmail1">Author</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="author"
              placeholder="Author"
              defaultValue={this.state.auth}
              onChange={this.authChange}
            />

            <label htmlFor="exampleInputEmail1">Publisher</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="publisher"
              placeholder="Publisher"
              defaultValue={this.state.pub}
              onChange={this.publisherChange}
            />

            <label htmlFor="exampleInputEmail1">isbn10</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="isbn10"
              placeholder="isbn10"
              defaultValue={this.state.isbn10}
              onChange={this.isbn10Change}
            />
            <label htmlFor="exampleInputEmail1">isbn13</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="isbn13"
              placeholder="isbn13"
              defaultValue={this.state.isbn13}
              onChange={this.isbn13Change}
            />
            <label htmlFor="exampleInputEmail1">image url</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="imageUrl"
              placeholder="image url"
              defaultValue={this.state.image}
              onChange={this.imageChange}
            />
          </div>
          <div className="Modal-button-container">
            <Button variant="contained" onClick={this.handleHide}>
              Close
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={this.submitEdits}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Modal;
