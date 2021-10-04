import React from 'react';
import { render } from 'react-dom';

import { doc } from 'firebase/firestore';
import {
  useFirestoreDocData,
  useFirestore,
} from 'reactfire';


function BurritoTaste() {
  // easily access the Firestore library
  const bookRef = doc(useFirestore(), 'testsavedbook', 'savedbook1');

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(bookRef);

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  return <p>The book is {data.title}</p>;
  // console.log(data.title);
}

export default BurritoTaste;