import axios from 'axios';
import { axiosWithAuth } from '../util/axiosWithAuth';

// registers a new user *WORKING*
export const register = (newUser) => {
    return dispatch => {
        axios
            .post("https://sleep-tracker-bw4.herokuapp.com/api/auth/register", newUser)
            .then(res => {
                dispatch({ type: "REGISTER", payload: res })
            })
            .catch(err => console.log("Error from get Register call in actions: ", err));
    }
}


// logs the user in *WORKING*
export const login = (res) => {
    return { type: "LOGIN" , payload: res.data }
}

// gets the array of all the users *WORKING*
export const getUsers = () => {
    return dispatch => {
        axios
            .get("https://sleep-tracker-bw4.herokuapp.com/api/users")
            .then(res => {
                dispatch({ type: "GET_USERS", payload: res.data })
            })
            .catch(err => console.log("Error from getUsers call in actions: ", err));
    }
}

/*
*******************************************************************
    ALL AXIOSWITHAUTH ACTIONS BELOW HERE
********************************************************************    
*/

// gets all the entries that a specific user made *WORKING*
export const getUserEntries = (userId) => {
    return dispatch => {
        axiosWithAuth()
            .get(`/users/${userId}/entries`)
            .then(res => {
                dispatch({ type: "GET_USER_ENTRIES", payload: res.data })
            })
            .catch(err => console.log("Error from getUserEntries call in actions", err));
    }
}

// gets a specifed entry from specifed user *WORKING*
export const getEntry = (userId, entryId) => {
    return dispatch => {
        axiosWithAuth()
            .get(`/users/${userId}/entries/${entryId}`)
            .then(res => {
                dispatch({ type: "GET_ENTRY", payload: res.data })
            })
            .catch(err => console.log("Error from getEntry call in actions", err));
    }
}

// creates an entry for a specifed user *WORKING*
export const createEntry = (userId, entry) => {
    return dispatch => {
        axiosWithAuth()
            .post(`/users/${userId}/entries`, entry)
            .then(res => {
                dispatch({ type: "CREATE_ENTRY", payload: res.data })
            })
            .catch(err => console.log("Error from createEntry call in actions", err));
    }
} 

// edits specifed entry from specifed user *WORKING*
export const editEntry = (userId, entryId, entry) => {
    return dispatch => {
        axiosWithAuth()
            .put(`/users/${userId}/entries/${entryId}`, entry)
            .then(res => {
                dispatch({ type: "EDIT_ENTRY", payload: res.data })
            })
            .catch(err => console.log("Error from editEntry call in actions", err));
    }
}

// deletes specifed entry from specifed user *WORKING*
export const deleteEntry = (userId, entryId) => {
    return dispatch => {
        axiosWithAuth()
            .delete(`/users/${userId}/entries/${entryId}`)
            .then(res => {
                dispatch({ type: "DELETE_ENTRY", payload: entryId })
            })
            .catch(err => console.log("Error from deleteEntry call in actions", err));
    }
}