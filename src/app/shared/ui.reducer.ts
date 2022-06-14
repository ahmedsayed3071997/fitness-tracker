import { Action } from "@ngrx/store"
import * as  UIActions from "./ui.actions";

export interface State { 
    isLoading:boolean
};
const initialStat:State = {
    isLoading: false
}

export function uiReducer(state = initialStat, action:UIActions.UIActions) { 
    switch (action.type) {
        case UIActions.START_LOADING :
            return {
                isLoading:true
            }
            break;
        case UIActions.STOP_LOADING :
            return {
                isLoading:false
            }
        default:
            return state;
            break;
    }
}


export const getIsLoading = (state:State) => state.isLoading;