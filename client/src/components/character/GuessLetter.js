import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HiddenAnswer from "./HiddenAnswer";

class GuessLetter extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      answer: "",
      choice: [],
      attempts: 6,
      winOrLose: ""
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.props.onRef(this);
    window.addEventListener("keypress", this.keyHandler);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      answer: nextProps.character.character.name
    });
  }

  keyHandler = e => {
    if (this.state.winOrLose) {
      e.preventDefault();
    } else {
      this.tryLetter(e.key.toUpperCase());
    }
  };

  tryLetter(guessletter) {
    let answer = this.state.answer.split("");

    if (answer.indexOf(guessletter) === -1) {
      this.setState({
        attempts: this.state.attempts - 1
      });
    }
    this.setState({
      choice: this.state.choice.concat(guessletter)
    });

    this.winner(answer);

    this.loser();
  }

  winner(answer) {
    const answerVal = answer.filter(element =>
      this.state.choice.includes(element)
    );
    if (answerVal.join("") === answer.join("")) {
      this.setState({
        winOrLose: "Good Job!"
      });
    }
  }

  loser() {
    if (this.state.attempts === 0) {
      this.setState({
        winOrLose: "Game Over!"
      });
    }
  }

  answer() {
    return this.state.answer
      .split("")
      .map((val, i) => <HiddenAnswer item={val} val={this.state.choice} />);
  }
  gameInitialState() {
    this.setState(this.initialState);
  }

  render() {
    const isPlaying = this.props.character.startPlaying;

    let attempts;
    if (isPlaying) {
      attempts = (
        <div>
          <p className="tries-text">
            You have {this.state.attempts} more tries.
          </p>
          <p className="used-letters">
            Letters used: <span>{this.state.choice}</span>
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="hidden-text">{this.answer()}</div>

        <br />
        {attempts}
        <h1 className="winner-loser">{this.state.winOrLose}</h1>
      </div>
    );
  }
}

GuessLetter.propTypes = {
  character: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  character: state.character
});
export default connect(mapStateToProps)(GuessLetter);
