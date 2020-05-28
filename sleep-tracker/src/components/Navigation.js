import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding: 0;
    height: 7vh;
    background: #79bcc4;
`

const StyledLink = styled(Link)`
    border-style: none;
    margin-right: 1%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #486775;
    width: 5%;
    height: 70%;
    text-decoration: none;
    background-color: white;
    border-radius: 10px;
    background: linear-gradient(145deg, #81c9d2, #6da9b0);
    box-shadow:  4px 4px 7px #67a0a7, 
                 -4px -4px 7px #8bd8e1;
    &:hover {
        background: white;
    }
`


function Navigation(props) {
    return (
        <>
            <Nav>
                <StyledLink to="/">Log out</StyledLink>
            </Nav>
        </>
    )
}

export default connect((state) => {
    return {
        name: state.name
    }
})(Navigation);