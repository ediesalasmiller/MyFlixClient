//this file will contain the logic for all reducers
//function is called a reducer. it takes a state and an action .. if it's concered by the action it changed state.

import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";


function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
            default:
                return state;
    }
}
//initialize state as empty array, because movies are array 
function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
            default:
                return state;
    }
}

//combined reducer
const moviesApp = combineReducers ({
    visibilityFilter,
    movies
});

export default moviesApp;