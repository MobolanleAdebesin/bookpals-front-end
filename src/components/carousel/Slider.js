import React, { Component } from "react";
import axios from "axios";
import Slide from "./Slide.js";
import LeftArrow from "./LeftArrow.js";
import RightArrow from "./RightArrow.js";
import "./Slider.css";
import InfoModal from "../Modal/InfoModal";
import Button from "@material-ui/core/Button";
// import axios from "axios";
// import DrawerModal from "../Modal/DrawerModal";
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
    this.props.changeSuggestions(this.state.currentIndex - 1);
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
    this.props.changeSuggestions(this.state.currentIndex + 1);
  };
  slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };
  showInfo = () => {
    this.props.getIndex(this.state.currentIndex);
    this.props.changeInfo();
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
            <Button
              className="Slider-button"
              variant="contained"
              onClick={this.handleShow}
            >
              Edit
            </Button>

            <InfoModal
              book={this.props.allBooks[this.state.currentIndex]}
            ></InfoModal>
            <Button
              className="Slider-button"
              variant="contained"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Slider;
