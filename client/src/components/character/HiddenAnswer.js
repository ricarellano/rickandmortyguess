import React, { Component } from "react";
class HiddenAnswer extends Component {
  render() {
    return (
      <span>
        {this.props.val.indexOf(this.props.item) !== -1
          ? this.props.item
          : "__ "}
      </span>
    );
  }
}

export default HiddenAnswer;
