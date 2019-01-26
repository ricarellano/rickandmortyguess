import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCharacter } from "../../actions/characterAction";
import { randomId } from "../../common/utils";
import GuessLetter from "./GuessLetter";
import spaceShip from "../../img/spaceShip.png";

class Character extends Component {
  onStartClick() {
    this.props.getCharacter(randomId());
    this.props.character.startPlaying = true;
    this.guessLetter.gameInitialState();
  }

  render() {
    const { character } = this.props.character;
    const isPlaying = this.props.character.startPlaying;

    let apiContent;

    if (isPlaying) {
      apiContent = (
        <>
          <p className="content-text">Type a letter to complete the name:</p>
        </>
      );
    } else {
      apiContent = (
        <div>
          <p className="welcome">Welcome to the Game!</p>
          <p className="instructions">
            Use your keyboard to type a possible letter that completes the name
            of each character in the picture.
          </p>
        </div>
      );
    }
    return (
      <>
        <div className="img-content">
          <img
            className="img-character"
            src={isPlaying ? character.image : spaceShip}
            alt={character.name}
          />
          <p className="species">
            {isPlaying ? "Species: " + character.species : ""}
          </p>
        </div>
        <div className="content">
          {apiContent}
          <GuessLetter
            onRef={ref => (this.guessLetter = ref)}
            character={character.name}
          />
        </div>
        <div className="btn-start">
          <button className="startButton" onClick={() => this.onStartClick()}>
            {isPlaying ? "Another Character" : "Start"}
          </button>
        </div>
      </>
    );
  }
}

Character.propTypes = {
  getCharacter: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  character: state.character
});

export default connect(
  mapStateToProps,
  { getCharacter }
)(Character);
