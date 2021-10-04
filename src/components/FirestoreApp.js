import React from "react";
import 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';


function FirestoreApp() {
  const firestore = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestore}>
      <App />
    </FirestoreProvider>
  );
}

export default FirestoreApp;
