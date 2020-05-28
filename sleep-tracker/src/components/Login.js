import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from 'react-redux'; // eloy: added this to hook up state and actions
import { login } from '../actions'; // eloy: added this to hook up state and actions
import axios from 'axios'; // imported axios
import styled from 'styled-components'; 

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

const Loader = styled.div`
  border: 5px solid #79bcc4;
  border-radius: 50%;
  border-top: 5px solid #486775;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const P = styled.p`
  color: #486775;
  font-style: italic;
`

const LoaderDiv = styled.div`
  margin-top: 7%;
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const formSchema = yup.object().shape({
  email: yup
    .string()
    //.email("Must be a valid Email") // eloy: changed this from Email to Username because email is not used in backend.
    .required("Must include an username."), // eloy: changed this from Email to Username because email is not used in backend.
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters long") // eloy: changed this to 3 because default users in server have passwords that are 3 characters long
    .required("Password is required"),
});

const Login = (props) => {
  const [ loading, setLoading ] = useState(false);

  const [ inValidLogin, setInValidLogin ] = useState(false);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
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
      .validate(event.target.value)
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

    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("login form data",formData); // eloy: added this to check what data is being submitted
    setLoading(true);

    axios
        .post("https://sleep-tracker-bw4.herokuapp.com/api/auth/login", { username: formData.email, password: formData.password }) // eloy: data submitted to backend
        .then(res => {
            setInValidLogin(false);
            window.localStorage.setItem('token', res.data.token);
            props.login(res);
            props.history.push('/Home');
        })
        .catch(err => {
          setLoading(false);
          console.log("Error from get Login call in Login: ", err)
          setInValidLogin(true);
        });
        
    setformData({ email: "", password: "" });
  };

  return (
    <Div>
      <H1>Sleep Tracker</H1>
      <OuterDiv>
        <form >
          <InnerDiv>
            <Input
              onChange={onInputChange}
              id="email"
              name="email"
              value={formData.email}
              placeholder="Username" // eloy: changed this from Email to Username because email is not used in backend.
            ></Input>

            <Input
              onChange={onInputChange}
              id="password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Password"
            ></Input> 

            <ButtonDiv>
              <Button id="button" name="button" onClick={onSubmit}>Login</Button>
              <Button onClick={() => props.history.push('/Onboarding')}>Sign Up</Button>
            </ButtonDiv>
          </InnerDiv>
        </form>
        {errors.password.length > 6 ? <p style={{color: "red"}}>{errors.password}</p> : null} {/* eloy: styled errors */}
        {errors.email.length > 0 ? <p style={{color: "red"}}>{errors.email}</p> : null} {/* eloy: styled errors */}
        {inValidLogin === true ? <p style={{color: "red"}}>invalid username or password</p> : null} {/* eloy: added this incase login is invalid */}
        {loading === true ? <LoaderDiv><P>Loading </P> <Loader/></LoaderDiv> : null}
      </OuterDiv>
    </Div>
  );
};

export default connect(null, { login: login })(Login); // eloy: added this to hook up state and actions
