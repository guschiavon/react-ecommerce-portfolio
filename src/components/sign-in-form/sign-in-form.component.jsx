import { useState } from 'react';
import {  
  signInWithGooglePopup,    
  signInUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'



import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
   // method to make request to Google for accessToken
  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();       
    } catch(err) {
      return
    }
  }
  
  const handleInputChange = (event) => {
    // abstract attributes from event target
    const {name, value} = event.target;
    // spread to only update the related field in the state object
    setFormFields({...formFields, [name]: value })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {      
      await signInUserWithEmailAndPassword(email, password);      
      // set the current logged in user using useContext
      
      resetFormFields();
    } catch(err) {
     switch(err.code) {
      case 'auth/wrong-password':
        alert('Incorrect password')
        break;
      case 'auth/user-not-found':
        alert('No account resulting from this email')
        break;
      case 'auth/invalid-email':
        alert('Invalid email format')
        break;
      case 'auth/invalid-login-credentials':
        alert('Invalid credentials')
        break;
      default:
        console.log(err)
     }
    }   
  }
  return (
    <div className='sign-in-form-container'>
      <span>Welcome Back!</span>
      <h2 className=''>Sign In</h2>
      <form>
        <FormInput required label='Email' type='email' name='email' value={email} onChange={handleInputChange} />
        <FormInput required label='Password' type='password' name='password' value={password} onChange={handleInputChange} />
        <div className='form-buttons-container'>
          <Button type='submit' onClick={handleSubmit}>Sign In</Button>        
          <Button type='button' buttonType={'google'} onClick={logGoogleUser}>Google Sign In</Button>
        
        </div>     
      </form>
    </div>
  )
}

export default SignInForm;