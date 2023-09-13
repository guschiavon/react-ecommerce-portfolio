import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
 } from "../../utils/firebase/firebase.utils";

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
      <h2>Sign Up with Email and Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          required
          type="text"
          name='displayName'
          value={displayName}
          onChange={handleInputChange}
        />

        <label>Email</label>
        <input type="email" required name='email' value={email} onChange={handleInputChange}/>

        <label>Password</label>
        <input type="password" required name='password' value={password} onChange={handleInputChange}/>

        <label>Confirm Password</label>
        <input type="password" required name='confirmPassword' value={confirmPassword} onChange={handleInputChange}/>

        <button type="submit">Create Account</button>
      </form>
    </div>
  )
};
export default SignUpForm;