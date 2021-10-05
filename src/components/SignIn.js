import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn(props) {
  const history = useHistory();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email.value, form.password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        props.onSuccess(user);
        history.push('/');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Email: <input name='email' type='text' /></div>
      <div>Password: <input name='password' type='password' /></div>
      <button>Sign In</button>
      <div><Link to='/signup'>Sign Up</Link></div>
    </form>
  );
}

export default SignIn;