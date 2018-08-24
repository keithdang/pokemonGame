import axios from "axios";
import { FETCH_USER, FETCH_POKEMON } from "./types";
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
  console.log("kdawg1: ", value);
  // var obj = { title: value };
  const res = await axios.post("/api/select/pokemon", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
