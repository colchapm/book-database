import React from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp(props) {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.password.value === form.password2.value) {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, form.email.value, form.password.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(userCredential);
          history.push('/');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          // ..
        });
    } else {
      alert("Passwords don't match");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Email: <input name='email' type='text' /></div>
      <div>Password: <input name='password' type='password' /></div>
      <div>Confirm Password: <input name='password2' type='password' /></div>
      <button type='submit'>Sign Up</button>
    </form>
  );
}

export default SignUp;