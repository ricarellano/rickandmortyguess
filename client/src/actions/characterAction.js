import axios from "axios";

import { GET_CHARACTER } from "./types";

export const getCharacter = id => dispatch => {
  axios
    .get(`/api/characters/${id}`)
    .then(res =>
      dispatch({
        type: GET_CHARACTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHARACTER,
        payload: null
      })
    );
};
