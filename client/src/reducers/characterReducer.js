import { GET_CHARACTER } from "../actions/types";

const initialState = {
  character: {},
  startPlaying: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTER:
      return {
        ...state,
        character: action.payload
      };
    default:
      return state;
  }
}
