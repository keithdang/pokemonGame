import axios from "axios";
import {
  FETCH_USER,
  FETCH_POKEMON,
  FETCH_MOVE,
  FETCH_OPPONENT_MOVE
} from "./types";
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const handlePoints = value => async dispatch => {
  const res = await axios.post("/api/points", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const fetchPokemon = () => async dispatch => {
  const res = await axios.get("/api/pokemon");
  dispatch({ type: FETCH_POKEMON, payload: res.data });
};
export const selectPokemon = value => async dispatch => {
  // console.log("kdawg1: ", value);
  const res = await axios.post("/api/select/pokemon", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const fetchMove = value => async dispatch => {
  // console.log("move1", value);
  const res = await axios.get("/api/move", {
    params: { name: value }
  });
  dispatch({ type: FETCH_MOVE, payload: res.data });
};
export const fetchOpponentPokemon = () => async dispatch => {
  const res = await axios.get("/api/opponent/pokemon", {
    params: { name: "Bulbasaur" }
  });
  dispatch({ type: FETCH_POKEMON, payload: res.data });
};
export const fetchOpponentMove = value => async dispatch => {
  // console.log("move1", value);
  const res = await axios.get("/api/opponent/move", {
    params: { name: value }
  });
  dispatch({ type: FETCH_OPPONENT_MOVE, payload: res.data });
};
