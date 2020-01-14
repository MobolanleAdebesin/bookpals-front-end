import React, { Component } from "react";
import "./Home.css";
import bookImage from "./—Pngtree—open book_5054230.png";
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-container">
          <div className="Home-greeting">
            <h1 className="Home-title">Welcome!</h1>
            <h4 className="Home-paragraph">
              Whether you’ve been looking for something new to read, or you want
              to share a new find, BookPals is a site designed for avid readers
              and book lovers alike. Have a book you love? Add it to our
              collection!
            </h4>
          </div>

          <div className="Home-image-container">
            <img className="Home-image" src={bookImage} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
