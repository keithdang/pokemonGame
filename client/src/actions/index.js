import axios from "axios";
import {
  FETCH_USER,
  FETCH_POKEMON,
  FETCH_MOVE,
  FETCH_OPPONENT_MOVE,
  FETCH_TYPE_EFFECTIVENESS,
  FETCH_TYPE_COLLECTION,
  FETCH_TEAM
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
  //console.log(value);
  // console.log("move1", value);
  const res = await axios.get("/api/move", {
    params: { name: value }
  });
  dispatch({ type: FETCH_MOVE, payload: res.data });
};
export const fetchTeam = value => async dispatch => {
  console.log("kdawg", value);
  const res = await axios.get("/api/team", {
    params: { name: value }
  });
  dispatch({ type: FETCH_TEAM, payload: res.data });
};
export const selectTeam = value => async dispatch => {
  console.log("kdawg2", value);
  const res = await axios.post("/api/select/team", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const selectIndex = value => async dispatch => {
  console.log("selectIndex:", value);
  const res = await axios.post("/api/index", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export const fetchOpponentPokemon = () => async dispatch => {
  var arrNum = [1, 2, 3, 4, 6, 7, 9, 25, 86, 140, 149];
  //var arrNum = [1, 2, 4, 7]; for dev
  var index = getRandomInt(4);
  const res = await axios.get("/api/opponent/pokemon", {
    params: { pokeId: arrNum[index] }
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
export const fetchTypeEffectiveness = value => async dispatch => {
  const res = await axios.get("/api/type/move", {
    params: { type: value }
  });
  dispatch({ type: FETCH_TYPE_EFFECTIVENESS, payload: res.data });
};
export const fetchTypeCollection = () => async dispatch => {
  const res = await axios.get("/api/type/moveSet");
  // const res = await axios.get("/api/type/moveSet", {
  //   params: { type: "FireToGrass" }
  // });
  dispatch({ type: FETCH_TYPE_COLLECTION, payload: res.data });
};
