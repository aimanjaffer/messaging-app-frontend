import {React} from 'react';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormGroup } from 'react-bootstrap';
const SignUpComponent = (props) => {
    const { register, handleSubmit, setError, formState: { errors }, getValues } = useForm();
    //const [validated, setValidated] = useState(false);
    
    const formSubmissionHandler = (e) => {
        //console.log("validated value: ", validated);
        //setValidated(true);
        let userName = getValues('usernameField');
        //console.log("submit handler called");
        //console.log(e);
        //console.log(errors.usernameField);
        //console.log(username);
        if(typeof userName !== "undefined"){
            fetch(`https://messaging-app-server.azurewebsites.net/validate/username/${userName}`)
            .then(response => response.json())
            .then((response) => {
              if(response != null && response.validUserName){
                    //console.log(username," is valid");
                    let fullName = getValues('fullNameField');
                    let date = new Date();
                    let currentTime = date.getHours() +":"+ date.getMinutes();
                    const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userName: userName,
                        FullName: fullName,
                        lastSeenTime: currentTime
                        })
                    };
                    fetch('https://messaging-app-server.azurewebsites.net/users/new', requestOptions)
                        .then(response => response.json())
                        .then((response) => {
                        if(response != null && response.signUpSuccessful){
                            props.callback(response.signUpSuccessful);
                        }  
                        });
              }else{
                //console.log(username," is not valid");
                  setError("usernameField", {
                    type: "usernameNotAvailable",
                    message: "This username is not available",
                  });
              }  
            });
          }
            
      }

    return (
    
        <Form noValidate onSubmit={handleSubmit(formSubmissionHandler)}>
            <Row className="my-2">
                <FormGroup>
                <label htmlFor="usernameField">Username:</label>
                <Form.Control isInvalid={errors.usernameField} type="text" {...register("usernameField", { required: true, pattern: /^[A-Za-z0-9_.]+$/i })} />
                <Form.Control.Feedback type="invalid">
                    {errors.usernameField?.type ==='required' && "Username is required"}
                    {errors.usernameField?.type ==='pattern' && "No special characters allowed in Username"}
                    {errors.usernameField?.type ==='usernameNotAvailable' && errors.usernameField?.message}
                </Form.Control.Feedback>
                </FormGroup>
            </Row>
            <Row className="my-2">
            <FormGroup>
            <label htmlFor="fullNameField">Full Name:</label>
            <Form.Control isInvalid={errors.fullNameField} type="text" {...register("fullNameField", { required: true, pattern: /^[ A-Za-z0-9_.]+$/i })} />
            <Form.Control.Feedback type="invalid">
                {errors.fullNameField?.type ==='required' && "Full Name is required"}
                {errors.fullNameField?.type ==='pattern' && "No special characters allowed in Full Name"}
            </Form.Control.Feedback>
            </FormGroup>
            </Row>
            <Row className="my-2">
            <Col className="text-center"><Button variant="primary" type="submit" >Submit</Button></Col>
            </Row>
            
                       
        </Form>
);
}
export default SignUpComponent;