import React, { Component } from "react";
import "./Booklist.css";
import axios from "axios";
import Modal from "./Modal/Modal.js";
import Slider from "./carousel/Slider.js";
class Booklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      index: 0,
      show: false,
      currentIndex: 0,
      title: "",
      desc: "",
      auth: "",
      pub: "",
      isbn10: "",
      isbn13: "",
      image: "",
      id: "",
      info: "hide"
    };
  }
  componentDidMount() {
    axios
      .get("https://bola-api.herokuapp.com/books")
      .then(res => {
        let allBooks = res.data;

        this.setState({ bookData: allBooks });
      })
      .catch(err => {
        console.log(err);
      });
  }
  delete = book => {
    axios
      .delete(`https://bola-api.herokuapp.com/books/id/${book}`)
      .then(() => {
        axios.get("https://bola-api.herokuapp.com/books").then(res => {
          this.setState({ bookData: res.data });
        });
      })
      .catch(err => console.log(err))
      .catch(err => console.log(err));
  };

  getIndex = index => {
    let book = this.state.bookData[index];

    this.setState({
      title: `${book.title}`,
      desc: `${book.description}`,
      auth: `${book.author}`,
      pub: `${book.publisher}`,
      isbn10: `${book.isbns[0].isbn10}`,
      isbn13: `${book.isbns[0].isbn13}`,
      image: `${book.image}`,
      id: `${book._id}`
    });
  };
  changeInfo = () => {
    this.setState({ info: "show" });
  };

  hideInfo = () => {
    this.setState({ info: "hide" });
  };

  show = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    if (this.state.show) {
      return (
        <div className="booklist">
          <Modal hideModal={this.hideModal} {...this.state}></Modal>
          <Slider
            allBooks={this.state.bookData}
            delete={this.delete}
            show={this.show}
            prevSlide={this.prevSlide}
            nextSlide={this.nextSlide}
            getIndex={this.getIndex}
            changeInfo={this.changeInfo}
          ></Slider>
        </div>
      );
    } else if (!this.state.show && this.state.info !== "hide") {
      return (
        <div className="booklist">
          <Slider
            allBooks={this.state.bookData}
            delete={this.delete}
            edit={this.edit}
            show={this.show}
            getIndex={this.getIndex}
            changeInfo={this.changeInfo}
          ></Slider>
          <div className="bookInfo">
            <h4>Title: {this.state.title}</h4>
            <h5>Author: {this.state.auth}</h5>
            <h5 className="Booklist-description">
              Description: <br />
              {this.state.desc}
            </h5>
            <h5>Publisher: {this.state.pub}</h5>
            <h5> isbn10: {this.state.isbn10}</h5>
            <h5>isbn13: {this.state.isbn13}</h5>
            <button className="btn btn-dark" onClick={this.hideInfo}>
              Close
            </button>
          </div>
        </div>
      );
    } else if (!this.state.show) {
      return (
        <div className="booklist">
          <Slider
            allBooks={this.state.bookData}
            delete={this.delete}
            edit={this.edit}
            show={this.show}
            getIndex={this.getIndex}
            changeInfo={this.changeInfo}
          ></Slider>
        </div>
      );
    }
  }
}
export default Booklist;
