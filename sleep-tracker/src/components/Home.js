import React from 'react';
import { connect } from 'react-redux';
import { getUsers, login, getUserEntries, register, getEntry, createEntry, editEntry, deleteEntry } from '../actions';
import Navigation from './Navigation';
import Graph from './Graph';
import RecommendedSleep from './RecommendedSleep';
import Entries from './Entries';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

/*
    username: johndoe1
    password: "123"
    DO NOT DELETE THIS
*/

const Div = styled.div`
    border: 1px solid #79bcc4;
    background-color: #79bcc4;
    height: 100%;
`

function Home(props) {


    const sendToLog = (login) => {
        axios
        .post("https://sleep-tracker-bw4.herokuapp.com/api/auth/login", login) // eloy: data submitted to backend
        .then(res => {
            window.localStorage.setItem('token', res.data.token);
            props.login(res);
        })
        .catch(err => {
          console.log("Error from get Login call in Home: ", err)
        });
    }

    if (props.name === null) {
        return <Redirect to="/" />
    } else {
        return (
            
            <Div>
                <Navigation/>
                {/* <button onClick={props.getUsers}>getUsers</button> */}
                {/* <button onClick={() => sendToLog({ username: "johndoe1", password: "123" })}>Login</button> */}
                {/* <button onClick={() => props.register({ username: "guyperson", password: "123", name: "guy person", age: 20 })}>Register</button> */}
                {/* <button onClick={() => props.getUserEntries(1)}>getUserEntries</button> */}
                {/* <button onClick={() => props.getEntry(1, 1)}>getEntry</button> */}
                {/* <button onClick={() => props.createEntry(1, {date: "5-1-2020", sleep_start: "12am", sleep_end: "2am", total_time: 7, mood_score: 4})}>createEntry</button> */}
                {/* <button onClick={() => props.editEntry(1, 1, {date: "05-21-2020", sleep_start: "10pm", sleep_end: "6am", total_time: 1, mood_score: 4})}>editEntry</button> */}
                {/* <button onClick={() => props.deleteEntry(1, 1)}>deleteEntry</button> */}
                <Graph/>
                <Entries/>
                <RecommendedSleep/>
            </Div>  
            
        )
    }
}

export default connect((state) => {
    return {
        name: state.name
    }
}, { getUsers: getUsers, login: login, getUserEntries: getUserEntries, register: register, getEntry: getEntry, createEntry: createEntry, editEntry: editEntry, deleteEntry: deleteEntry })(Home);