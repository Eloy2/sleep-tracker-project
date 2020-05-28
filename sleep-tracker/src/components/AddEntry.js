import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { formatThisDate, formatThisHour } from '../util/utilFunctions';
import { createEntry } from '../actions';

const OuterDiv = styled.div`
    margin: .5%;
    padding: .5%;
    display: flex;
    flex-direction: column;
    width: 13%;
    transition: transform .2s;
    border-radius: 10px;
    background: #79bcc4;
    box-shadow:  6px 6px 11px #67a0a7, 
                 -6px -6px 11px #8bd8e1;
    &:hover {
        transform: scale(1.07);
      } 
` 
const InnerDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between; 
`
const P = styled.p`
    font-weight: bold;
    color: #486775;
`

const Button = styled.div`
    cursor:pointer;
    font-size: 1rem;
    font-weight: bold;
    color: #486775;
    padding: 3%;
    margin: 2%;
    border-radius: 5px;
    background: linear-gradient(145deg, #81c9d2, #6da9b0);
    box-shadow:  4px 4px 9px #67a0a7, 
                -4px -4px 9px #8bd8e1;
    &:hover {
        background: white;
    }
`

const DateDiv = styled.div`
`

const Input = styled(DatePicker)`
    color: #486775;
    text-align: center;
    padding-top: 5%;
    padding-bottom: 5%;
    border-style: none;
    border-radius: 3px;
    background: #79bcc4;
    box-shadow: inset 4px 4px 7px #67a0a7, 
                inset -4px -4px 7px #8bd8e1;
`

const Select = styled.select`
    color: #486775;
    text-align: center;
    padding-top: 5%;
    padding-bottom: 5%;
    border-style: none;
    border-radius: 3px;
    background: #79bcc4;
    box-shadow: inset 4px 4px 7px #67a0a7, 
                inset -4px -4px 7px #8bd8e1;
`


function AddEntry(props) {
    const [ formState, setFormState ] = useState({
        date: "",
        sleep_start: "",
        sleep_end: "",
        mood_score: "",
    });

    const formatData = () => {
        const [ formatedDate, totalHours ] = formatThisDate(formState.date, formState.sleep_start.getHours(), formState.sleep_end.getHours())

        return (
            {
                ...formState,
                date: formatedDate,
                sleep_start: formatThisHour(formState.sleep_start.getHours()),
                sleep_end: formatThisHour(formState.sleep_end.getHours()),    
                mood_score: parseInt(formState.mood_score),
                total_time: totalHours 
            }
        )
    }

    const cancelChanges =() => {
        props.setAddEntry(!props.addEntry)
        setFormState({
            ...formState,
            date: "",
            sleep_start: "",
            sleep_end: "",
            mood_score: "",
        })
    }

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        if ((formState.date === "") || (formState.sleep_start === "") || (formState.sleep_end === "") || (formState.mood_score === "")) {
            alert("PLEASE FILL IN ALL THE BOXES!")
        } else {
            console.log(formatData());
            props.createEntry(props.userId, formatData());
            console.log("created");
            props.setAddEntry(!props.addEntry)
            setFormState({
                ...formState,
                date: "",
                sleep_start: "",
                sleep_end: "",
                mood_score: ""
            });
        }
    }

    return (
        <OuterDiv>
                <form>
                    <InnerDiv> 
                        <P>Date: </P>
                        <DateDiv> 
                            <Input name="date" selected={formState.date} onChange={dateSelected => setFormState({...formState, date: dateSelected})} placeholderText="Day Sleep Started"/>
                        </DateDiv>
                    </InnerDiv>
                    <InnerDiv> 
                        <P>Sleep Start: </P>
                        <DateDiv> 
                            <Input 
                                selected={formState.sleep_start}
                                onChange={time => setFormState({...formState, sleep_start: time})}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Sleep Start"
                                dateFormat="h:mm aa"
                                placeholderText="Time Sleep Started"
                            />
                        </DateDiv>
                    </InnerDiv>
                    <InnerDiv> 
                        <P>Sleep End: </P>
                        <DateDiv>
                            <Input 
                                selected={formState.sleep_end}
                                onChange={time => setFormState({...formState, sleep_end: time})}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Sleep End"
                                dateFormat="h:mm aa"
                                placeholderText="Time Sleep Ended"
                            />
                        </DateDiv>
                    </InnerDiv>
                    <InnerDiv> 
                        <P>Mood Score: </P> 
                    <Select name="mood_score" onChange={handleChange} value={formState.mood_score}>
                        <option></option>
                        <option value={4} >😃 4</option>
                        <option value={3} >🙂 3</option>
                        <option value={2} >😐 2</option>
                        <option value={1} >🙁 1</option>
                    </Select>
                    </InnerDiv>

                </form>
                <Button onClick={() => handleSubmit()}>Create Entry</Button> 
                <Button onClick={() => cancelChanges()}>Cancel</Button>  
        </OuterDiv>
    )
}

export default connect((state) => {
    return {
        userId: state.userId
    }
}, { createEntry: createEntry })(AddEntry);