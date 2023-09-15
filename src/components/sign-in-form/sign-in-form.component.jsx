import { useState } from 'react';
import {  
  signInWithGooglePopup,  
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

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
    const { user } = await signInWithGooglePopup(); // abstract the user object as it is all we need  
    await createUserDocumentFromAuth(user) // Async method from firebase.utils to create new user record upon auth
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
      resetFormFields();
    } catch(err) {
      console.log(err)
    }
    // If exists, then log user and then clear form

    // If doesnt exist, then alert that an account has to be created


  }
  return (
    <div>
      <form>
        <FormInput required label='Email' type='email' name='email' value={email} onChange={handleInputChange} />
        <FormInput required label='Password' type='password' name='password' value={password} onChange={handleInputChange} />        
        <Button type='submit' onClick={handleSubmit}>Sign In</Button>        
      </form>
      <Button buttonType={'google'} onClick={logGoogleUser}>Google Sign In</Button>
    </div>
  )
}

export default SignInForm;