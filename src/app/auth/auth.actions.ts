import { Action } from "@ngrx/store";

export const SET_AUTHANTICATED = '[Auth] SET_AUTHANTICATED';
export const SET_UNAUTHANTICATED = '[Auth] SET_UNAUTHANTICATED';

export class SetAuthanticated implements Action { 
    readonly type = SET_AUTHANTICATED;
    constructor(public payload?) { }
}

export class SetUnauthanticated implements Action { 
    readonly type = SET_UNAUTHANTICATED;
    constructor(public payload?) { }
}


export type AuthActions = SetAuthanticated | SetUnauthanticated;

