import * as  authActions from "./auth.actions";

export interface State { 
    isAuthanticated:boolean
};
const initialStat:State = {
    isAuthanticated: false
}

export function authReducer(state = initialStat, action:authActions.AuthActions) { 
    switch (action.type) {
        case authActions.SET_AUTHANTICATED :
            return {
                isAuthanticated:true
            }
            break;
        case authActions.SET_UNAUTHANTICATED :
            return {
                isAuthanticated:false
            }
        default:
            return state;
            break;
    }
}


export const getIsAuthanticated = (state:State) => state.isAuthanticated;