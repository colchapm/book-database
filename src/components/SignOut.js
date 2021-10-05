import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function SignIn(props) {
  const history = useHistory();
  
  useEffect(() => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('logout')
      props.onSuccess();
      history.push('/login');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  })

  return null;
}

export default SignIn;