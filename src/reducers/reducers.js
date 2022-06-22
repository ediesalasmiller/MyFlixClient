//this file will contain the logic for all reducers

import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

//function is called a reducer. it takes a state and an action .. if it's concered by the action it changed state.
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
            default:
                return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
            default:
                return state;
    }
}

//combined reducer, groups all the reducers together and only passes them the state thhey are concerned with.
function moviesApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}

export default moviesApp;