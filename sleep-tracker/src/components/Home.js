import React from 'react';
import { connect } from 'react-redux';
import { getUsers, login, getUserEntries, register, getEntry, createEntry, editEntry, deleteEntry } from '../actions';
import Navigation from './Navigation';
import Graph from './Graph';
import RecommendedSleep from './RecommendedSleep';
import Entries from './Entries';
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
    if (props.name === null) {
        return <Redirect to="/" />
    } else {
        return (
            
            <Div>
                <Navigation/>
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