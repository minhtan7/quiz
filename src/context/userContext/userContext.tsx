import React, { createContext, useReducer } from "react";
import { createUser, getUsers } from "../../API";
import { ACTIONTYPE, userAction } from "./action";

export interface UserState {
    id: number|null,
    name: string,
    email: string,
    play: [{
        score: number,
        playAt: string
    }] | null
}

interface UserContextState extends UserState{
    loading: boolean
}

const initialUserState: UserContextState = {
    id:null,
    name: "",
    email: "",
    play: null,
    loading: false
}

export const UserContext = createContext<{
    userState: UserContextState,
    userDispatch: React.Dispatch<userAction>
}>({
    userState: initialUserState,
    userDispatch: () => null
})

function userReducer(state: UserContextState, action: userAction) {
    switch (action.type) {
        case ACTIONTYPE.getUserPending:
            return { ...state, loading: true }
        case ACTIONTYPE.getUserSuccess:
            console.log(action.payload)
            return {...state, ...action.payload, loading: false}
        case ACTIONTYPE.getUserFail:
            return {...state, loading: false}
        default:
            throw new Error()
    }
}

export const UserProvider = ({ children }: { children: any }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState)
    return <UserContext.Provider value={{ userState, userDispatch }}>
        {children}
    </UserContext.Provider>
}

export const getUser = async(user: {name: string, email: string}, userDispatch:React.Dispatch<userAction>)=>{
    try {
        userDispatch({type: ACTIONTYPE.getUserPending})
        let data = await getUsers(user.email)
        if(data){
            userDispatch({type: ACTIONTYPE.getUserSuccess, payload: data})
        } else{
            data = await createUser(user)
            userDispatch({type: ACTIONTYPE.getUserSuccess, payload: data})
        }
    } catch (error) {
        userDispatch({type:ACTIONTYPE.getUserFail})
    }
}