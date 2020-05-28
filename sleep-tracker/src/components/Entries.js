import React, { useState } from 'react';
import { connect } from 'react-redux';
import EntryCard from './EntryCard';
import AddEntry from './AddEntry';
import styled from 'styled-components';

const Div = styled.div`
    background: #79bcc4;
    padding-top: .5%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: .5%;
`

const ButtonDiv = styled.div`
    margin-left: .5%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AddButton = styled.button`
    cursor:pointer;
    border-style: none;
    height: 96%;
    font-size: 3rem;
    color: #486775;
    border-radius: 10px;
    background: linear-gradient(145deg, #81c9d2, #6da9b0);
    box-shadow:  6px 6px 11px #67a0a7, 
                 -6px -6px 11px #8bd8e1;
    &:hover {
        background: white;
    }
`

const NoInfo = styled.h3`
    color: #486775;
    margin-top: 10%;
    margin-bottom: 10%;
`

function Entries(props) {
    const [ addEntry, setAddEntry ] = useState(false);

    return (
        <>
            <Div>
                {
                !props.userEntries ? <NoInfo>Loading Entries...</NoInfo> : 
                props.userEntries.length === 0 ? <NoInfo>Click here to add an entry =></NoInfo> :
                props.userEntries.map((item)=> {
                    return <EntryCard key={item.id} entry={item}/>
                })}
                {props.userEntries && !addEntry ? <ButtonDiv><AddButton onClick={() => setAddEntry(!addEntry)} title="Add New Entry">+</AddButton></ButtonDiv> 
                    : 
                    addEntry ? <AddEntry setAddEntry={setAddEntry} addEntry={addEntry} /> : null}
            </Div>
        </>  
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(Entries);