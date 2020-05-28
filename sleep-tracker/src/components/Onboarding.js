import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from 'react-redux'; // eloy: added this to hook up state and actions
import { register } from '../actions'; // eloy: added this to hook up state and actions
import styled from 'styled-components'; // eloy: added this for styles


const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #79bcc4;
`

const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 35%;
  width: 20%;
  border-radius: 50px;
  background: #79bcc4;
  box-shadow:  27px 27px 54px #67a0a7, 
               -27px -27px 54px #8bd8e1;
`

const InnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30%;
`

const Button = styled.div`
  cursor:pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #486775;
  padding: 5%;
  border-radius: 5px;
  background: linear-gradient(145deg, #81c9d2, #6da9b0);
  box-shadow:  4px 4px 9px #67a0a7, 
               -4px -4px 9px #8bd8e1;
  &:hover {
      background: white;
  }
`

const H1 = styled.h1`
  color: #486775;
  margin-bottom: 5%;
`

const Input = styled.input`
  margin-bottom: 5%;
  padding: 5%;
  border-style: none;
  border-radius: 3px;
  background: #79bcc4;
  box-shadow: inset 4px 4px 7px #67a0a7, 
              inset -4px -4px 7px #8bd8e1;
`

const formSchema = yup.object().shape({
  username: yup.string().required("Must include username"),
  firstname: yup.string().required("Must include first name"),
  lastname: yup.string().required("Must include lastname"),
  email: yup.string().required("Must contain a valid Email Adress"),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
});

const Onboarding = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  const onInputChange = (event) => {
    event.persist();

    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.name)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // eloy: connected form to back end and formated data
    if ((formData.username === "") || (formData.firstname === "") || (formData.lastname === "") || (formData.password === "")) {
      alert("PLEASE FILL IN ALL THE BOXES!")
    } else {
      props.register(
        { username: formData.username, password: formData.password, name: `${formData.firstname.toLowerCase()} ${formData.lastname.toLowerCase()}`, age: 20 }
      )
      props.history.push('/')
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        //email: "", // eloy: removed this because email is not used in backend.
        password: "",
      })
    }
  };

  return (
    <Div>
      <H1>Sleep Tracker Sign Up Page</H1>
      <OuterDiv>
        <form >
          <InnerDiv>
            <Input
              onChange={onInputChange}
              type="text"
              id="name"
              name="username"
              value={formData.username}
              placeholder="Username"
            ></Input>
            {errors.username.length > 0 ? <p>{errors.username}</p> : null}
            <Input
              type="text"
              id="firstname"
              name="firstname"
              onChange={onInputChange}
              value={formData.firstname}
              placeholder="First Name"
            ></Input>
            <Input
              onChange={onInputChange}
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              placeholder="Last Name"
            ></Input>
            <Input
              onChange={onInputChange}
              type="password" // changed this to password to hide password input
              id="password"
              name="password"
              value={formData.password}
              placeholder="Password"
            ></Input> 
            <ButtonDiv>
              <Button type="text" id="button" name="button" onClick={onSubmit}>Register</Button>
              <Button onClick={() => props.history.push('/')}>  Login</Button>
            </ButtonDiv>
          </InnerDiv>
        </form>
        
      </OuterDiv>
    </Div>
  );
};

export default connect(null, { register: register })(Onboarding);
