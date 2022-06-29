//movie action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

//user action type
export const SET_USER = 'SET_USER';



//action creators
export function setMovies(value) {
    return{ 
        type: SET_MOVIES, 
        value 
    };
}

export function setFilter(value) {
    return { 
        type: SET_FILTER, 
        value 
    };
}

export function setUser(userData) {
    return {
        type: SET_USER,
        userData
    };
}