import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
 
const OuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 0;
    padding-bottom: 0;
` 
const H3 = styled.h3`
    margin-bottom: 3%;
    color: #486775;
`
const P = styled.h1`
    font-weight: bold;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #486775;
    width: 20%;
    height: 100%;
`

const NoInfo = styled.h3`
    color: #486775;
    margin-top: 5%;
    margin-bottom: 5%;
`

const LoadingP = styled.p`
    color: #486775;
`

function formatData(data) {
    return (data.map((item) => {
        return {...item, date: item.date.substring(0, item.date.length - 5)}
    }))
}


function Graph(props) {
    return (
        <OuterDiv>
            {!props.name ? <LoadingP>Loading welcome...</LoadingP> : 
                <P>{props.name.toLowerCase()
                                .split(' ')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ')
                }
                </P>
            }  
            {
            !props.userEntries ? <NoInfo>Loading Graph...</NoInfo> : 
            props.userEntries.length === 0 ? <NoInfo>No Info To Display...</NoInfo> : 
            <BarChart width={1900} height={200} data={formatData(props.userEntries)} >
                <CartesianGrid stroke="#486775" />
                <Bar dataKey="total_time" fill="#486775" />
                <XAxis dataKey="date" stroke="#486775"/>
                <YAxis label={{ value: 'Hours', angle: -90, position: 'center' }} stroke="#486775"/>
            </BarChart>
            }
            {(!props.userEntries) || (props.userEntries.length === 0) ? null : <H3>Dates(month-day)</H3>}
        </OuterDiv>
    )
}

export default connect((state) => {
    return {
        name: state.name,
        userEntries: state.userEntries
    }
})(Graph);