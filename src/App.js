import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})

  const [validationStates, setValidationStates] = useState({emailState:false, passwordState:false})

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });

  const handlePasswordChange = ((e) => {
    const valor =  e.target.value
    setFormValues({...formValues, password: valor})

    const invalido = invalidPass(valor)
    setValidationStates({...validationStates, passwordState:invalido})

  });

  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });


  const manejarEmail = () => {
    const act = formValues.email
    const invalido = invalidEmail(act)
    setValidationStates({...validationStates, emailState:invalido})
  }

  const clickSubmit = (() => {
    //Call fetch
    manejarEmail()
    const estadoPass = validationStates.passwordState
    const estadoEmail = validationStates.emailState
    if(!estadoPass && !estadoEmail)
    {
      alert('Ha logrado ingresar a su cuenta exitosamente')
    }
  })

  const invalidEmail = (email) =>
  {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    

    return !emailRegex.test(email);
  }
  const invalidPass = (pass) =>
  {
    let rta = false;
    if(pass.length < 9)
    {
      rta = true;
    }
    if(!(/\d/.test(pass)))
    {
      rta = true
    }
    return rta;
  }


  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} isInvalid = {validationStates.emailState}/>
        { !validationStates.emailState && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
        { validationStates.emailState && <Form.Text className="text-muted">Your email must follow an established format.</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} isInvalid={validationStates.passwordState}/>
        { validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;