import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
 } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
//  Set the default state of the input fields
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
    
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();    
    // check if passwords are equal
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;      
    } 
    try {
      // get the user authentication details
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      // updates the context with signup      
      // create a user document with the authentication data; pass additional data
      await createUserDocumentFromAuth(user, { displayName });

      alert("Account successfully created!");
      
      resetFormFields();

    } catch(err) {
      if (err.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters long');
      }
    }
    
    // check if user authenticated with email and password

    // create a user document from the submit
  }

  const handleInputChange = (event) => {
    // abstract attributes from event target
    const {name, value} = event.target;
    // spread to only update the related field in the state object
    setFormFields({...formFields, [name]: value })
  }
  return (
    <div>
    <span>Don't have an account?</span>
      <h2>Sign Up with Email and Password</h2>
      <form onSubmit={handleSubmit}>        
        <FormInput required label='Display Name' type="text" name='displayName' value={displayName} onChange={handleInputChange} />       
        <FormInput required label='Email' type="email" name='email' value={email} onChange={handleInputChange} />       
        <FormInput required label='Password' type="password" name='password' value={password} onChange={handleInputChange} />
        <FormInput required label='Confirm Password' type="password" name='confirmPassword' value={confirmPassword} onChange={handleInputChange} />
        <Button type="submit">Create Account</Button>
      </form>
    </div>
  )
};
export default SignUpForm;