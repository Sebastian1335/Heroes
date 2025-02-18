import { types } from "../types/types";

export const authReducer = (state, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload,
            };
        case types.logout:
            return {
                ...state,
                logged: false,
            };
        default:
            return state;
    }
};
//! Los reducer no llaman recursos externos, unicamente se resuelven con el state y el action
