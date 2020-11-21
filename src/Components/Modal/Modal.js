import React, { Component } from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/index";

class Modal extends Component {
  // this could be a functional component
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal row"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
        {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
