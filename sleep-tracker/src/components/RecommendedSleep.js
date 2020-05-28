import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Div = styled.div`
    margin-bottom: 5%;
`
const H2 = styled.h2`
    margin-bottom: 0;
    color: #486775;
`
const H4 = styled.h4`
    margin: 0;
    padding: 0;
    font-size: 3rem;
    color: #486775;
`
const P = styled.p`
    color: #486775;
    font-style: italic;
`

const noHappyEntires = "You don’t have any entries with a mood score of 4(the happiest mood).\n Please increase the amount of hours that you sleep so that you can wake up with a happy mood.\n We will recommend the lowest amount of hours that you need to sleep to achieve this mood."

const LoadingH3 = styled.h3`
    color: #486775;
`

function RecommendedSleep(props) {

    const recommendedAmount = (entries) => {
        const highestMoodEntries =  entries.filter(item => {
            return item.mood_score === 4
        })

        let totalTimeArray = []

        highestMoodEntries.map(item => {
            return totalTimeArray.push(item.total_time)
        })
        
        return highestMoodEntries.length === 0 ? 0 : Math.min(...totalTimeArray)
        
    }

    return (
        <Div>
            <H2>We recommend you sleep: </H2>
            {
                !props.userEntries ? 
                
                <LoadingH3>Loading recommended amount of sleep...</LoadingH3> 
                
                : 

                props.userEntries.length < 30 ? // should be < 30

                <P>(You currently have {props.userEntries.length} {props.userEntries.length === 1 ? "entry" : "entries"}. 
                Once you have entered 30 or more entries we will 
                update this area with the recommended amount of hours that you should sleep.)</P>

                : 
            
                
                recommendedAmount(props.userEntries) === 0 ? 

                <P>({noHappyEntires})</P>

                : 
                <>
                    <H4>{recommendedAmount(props.userEntries)} hours per night</H4>
                    <P>(Since it is the lowest amount of sleep that you need to be in your happiest mood.)</P>
                </>
            }
        </Div>
    )
}

export default connect((state) => {
    return {
        userEntries: state.userEntries
    }
})(RecommendedSleep);