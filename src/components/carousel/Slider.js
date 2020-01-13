import React, { Component } from "react";
import axios from "axios";
import Slide from "./Slide.js";
import LeftArrow from "./LeftArrow.js";
import RightArrow from "./RightArrow.js";
import "./Slider.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      translateValue: 0,
      info: "show"
    };
  }
  handleDelete = () => {
    let bookId = this.props.allBooks[this.state.currentIndex]._id;
    console.log(bookId);
    this.props.delete(bookId);
  };
  handleShow = () => {
    this.props.show();
    this.props.getIndex(this.state.currentIndex);
  };
  prevSlide = () => {
    if (this.state.currentIndex === 0) {
      return;
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  };
  nextSlide = () => {
    if (this.state.currentIndex === this.props.allBooks.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue - this.slideWidth()
    }));
  };
  slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };
  showInfo = () => {
    this.props.getIndex(this.state.currentIndex);
    this.props.changeInfo();
  };
  getSuggestions = () => {
    // let bookTitle = this.props.allBooks[this.state.currentIndex].title;
    // let splitTitle = bookTitle.split(" ");
    // console.log(splitTitle[0]);
    let bookIsbn = this.props.allBooks[this.state.currentIndex].isbns[0].isbn13;
    console.log(bookIsbn);
    axios
      .get(
        ` https://www.goodreads.com/book/isbn/${bookIsbn}?key=454RCMVosu5JrBhf6pCtxw`
      )
      .then(res => {
        console.log(res);
      });
  };
  render() {
    if (this.state.info === "hide") {
      return (
        <div className="slider">
          <div
            className="slider-wrapper"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: `transform ease-out 0.45s`
            }}
          >
            {this.props.allBooks.map((book, i) => (
              <Slide key={i} image={book} />
            ))}
          </div>
          <div className="slider-arrow-container">
            <LeftArrow prevSlide={this.prevSlide}></LeftArrow>
            <RightArrow nextSlide={this.nextSlide}></RightArrow>
          </div>
          <div className="slider-button-container">
            <button className="slider-buttons" onClick={this.handleShow}>
              Edit
            </button>
            <button className="slider-buttons" onClick={this.handleDelete}>
              Delete
            </button>
            <button>Info </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="slider">
          <div
            className="slider-wrapper"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: `transform ease-out 0.45s`
            }}
          >
            {this.props.allBooks.map((book, i) => (
              <Slide key={i} image={book} />
            ))}
          </div>
          <div className="slider-arrow-container">
            <LeftArrow prevSlide={this.prevSlide}></LeftArrow>
            <RightArrow nextSlide={this.nextSlide}></RightArrow>
          </div>
          <div className="slider-button-container">
            <button
              className="btn btn-dark slider-buttons"
              onClick={this.handleShow}
            >
              Edit
            </button>
            <button
              className="btn btn-dark slider-buttons"
              onClick={this.showInfo}
            >
              Info
            </button>
            <button
              className=" btn btn-dark slider-buttons"
              onClick={this.handleDelete}
            >
              Delete
            </button>
            <button
              className="btn btn-dark slider-buttons"
              onClick={this.getSuggestions}
            >
              TasteKid
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Slider;
