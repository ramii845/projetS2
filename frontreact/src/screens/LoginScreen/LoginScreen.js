
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen'
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../actions/userActions';



const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    

    
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const history = useHistory();  
    useEffect(() =>{
      if (userInfo){
         history.push('/mynotes');
      }
    },[ history,userInfo]);


    const submitHandler = async (e) => {
      console.log("a2");
     
        e.preventDefault();
        dispatch(login(email, password))
        
      
                .then(() => {
                  console.log("a1");
               const user =  JSON.parse( localStorage.getItem("userInfo"));
               console.log(user);
               console.log(user.roles);

                  if (user.roles === "admin") {
                    console.log('Redirecting to Admin dashboard');}
                    else if (user.roles === "user"){
                      console.log('Redirecting to User dashboard');}
                      else {
                        console.log('Redirecting to Super User dashboard');
                      }
                    
                })
                .catch((err) => {
                  console.log('signin api function error: ', err);
    });
    };



  return (
    <MainScreen title='LOGIN'>
   <div className='loginContainer'>
   {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
   {loading && <Loading />}
   
   <Form onSubmit={submitHandler} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control 
    type="email"
    value={email}
     placeholder="Enter email" 
     onChange={(e) => setEmail(e.target.value)}
     />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control
     type="password"
     value={password}
     placeholder="Password"
     onChange={(e) => setPassword(e.target.value)}
     />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<Row className="py-3">
          <Col>
            New Customer ? <Link to="/registre">Register Here</Link>
          </Col>
        </Row>

   </div>
   
    </MainScreen>
  )
}

export default LoginScreen