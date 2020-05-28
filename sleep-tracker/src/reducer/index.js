import { sortArray } from '../util/utilFunctions';

const initialState = {
    name: null,
    age: null,
    userId: null,
    userEntries: null
}


export const reducer = (state = initialState, action) => {
    switch(action.type){

        case "REGISTER":
            console.log("POST_AUTH_REGISTER called from reducer", action.payload)
            return { ...state }
        case "LOGIN":
            console.log("LOGIN called from reducer", action.payload)
            return { ...state, name: action.payload.name, age: action.payload.age, userId: action.payload.userId, userEntries: sortArray(action.payload.entries) }
        case "GET_USERS":
            console.log("GET_USERS called from reducer", action.payload)
            return { ...state }
        case "GET_USER_ENTRIES":
            console.log("GET_USER_ENTRIES called from reducer", action.payload)
            return { ...state, userEntries: action.payload }
        case "GET_ENTRY":
            console.log("GET_ENTRY called from reducer", action.payload)
            return { ...state }
        case "CREATE_ENTRY":
            console.log("CREATE_ENTRY called from reducer", action.payload)
            return { ...state, userEntries: [ ...state.userEntries, action.payload ] }
        case "EDIT_ENTRY":
            console.log("EDIT_ENTRY called from reducer", action.payload)
            const newArr = [ ...state.userEntries.filter(item => item.id !== action.payload.id), action.payload ]
            return { ...state, userEntries: sortArray(newArr)}
        case "DELETE_ENTRY":
            console.log("DELETE_ENTRY called from reducer", action.payload)
            return { ...state, userEntries: state.userEntries.filter(item => item.id !== action.payload)}
        default:
            return state;
    }
}