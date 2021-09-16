import React from "react";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormGroup } from "react-bootstrap";
function LoginComponent(props) {
    const { register, handleSubmit, setError, formState: { errors }, getValues } = useForm();  
        
    const formSubmissionHandler = (e) => {
      let userName = getValues('usernameField').toLowerCase();//TODO: Do this check in backend instead
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: userName})
      };
      fetch('https://messaging-app-server.azurewebsites.net/login', requestOptions)
          .then(response => response.json())
          .then((response) => {
            if(response != null && response.loginSuccessful){
                props.callback(userName, response.loginSuccessful);
            }else{
              setError("usernameField", {
                type: "loginFailed",
                message: "Login Failed! Username is not valid",
              });
            }  
          });    
    }
    
    return (
      
        
      <Form noValidate onSubmit={handleSubmit(formSubmissionHandler)}>
      <Row className="my-2">
        <FormGroup>
          <label htmlFor="usernameField">Sign-in with your username:</label>
        <Form.Control isInvalid={errors.usernameField} type="text" {...register("usernameField", { required: true, pattern: /^[A-Za-z0-9_.]+$/i })} />
        <Form.Control.Feedback type="invalid">
          {errors.usernameField?.type ==='required' && "Username is required"}
          {errors.usernameField?.type ==='pattern' && "No special characters allowed in Username"}
          {errors.usernameField?.type ==='loginFailed' && errors.usernameField?.message}
        </Form.Control.Feedback>
        </FormGroup>
        </Row>
        <Row className="my-2">
        <FormGroup>
        <Button variant="primary" type="submit" >Sign-in</Button>
        </FormGroup>
      </Row>
      </Form>
      
     
    );
  }
  export default LoginComponent;