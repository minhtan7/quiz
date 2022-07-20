import { UserState } from "./userContext"

export enum ACTIONTYPE {
    getUserPending,
    getUserSuccess,
    getUserFail
}



export interface getUserPending {
    type: ACTIONTYPE.getUserPending
}

export interface getUserFail {
    type: ACTIONTYPE.getUserFail
}

export interface getUserSuccess {
    type: ACTIONTYPE.getUserSuccess,
    payload: UserState
}

export type userAction = getUserPending | getUserFail | getUserSuccess 