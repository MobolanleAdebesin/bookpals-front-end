import React, { Component } from "react";
import Axios from "axios";
import "./AddBook.css";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      author: "",
      publisher: "",
      isbns: "",
      image: ""
    };
  }
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

  submitBook = evt => {
    evt.preventDefault();
    Axios.post("https://bola-api.herokuapp.com/books", {
      title: this.state.title,
      description: this.state.desc,
      author: this.state.auth,
      publisher: this.state.pub,
      isbns: [{ isbn10: this.state.isbn10, isbn13: this.state.isbn13 }],
      image: this.state.image
    })
      .then(res => {
        console.log(res);
        this.redirectToTarget("/");
      })
      .catch(err => console.log(err));
  };
  redirectToTarget = () => {
    this.props.history.push(`/books`);
  };
  render() {
    return (
      <div className="AddBook-container">
        <form className="form AddBook-form">
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
            <button
              onClick={this.submitBook}
              type="submit"
              className="btn btn-dark"
            >
              Submit
            </button>
            <button className="btn btn-dark" onClick={this.redirectToTarget}>
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBook;
