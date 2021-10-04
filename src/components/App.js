import React, { useState, useEffect } from "react";
import Header from "./Header";
import BookControl from "./BookControl";
import SavedList from "./SavedList";
import DoneReadList from "./DoneReadList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'firebase/firestore';
import { useFirestoreDocData, useFirestore, FirestoreProvider, useFirebaseApp, useFirestoreCollection } from 'reactfire';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import BurritoTaste from "./BurritoTaste";


function App() {

  // const savedBooksRef = useFirestore().collection("savedbooks");
  // const { status, data } = useFirestoreCollection(savedBooksRef);

  const firestore = getFirestore(useFirebaseApp());
  // const bookRef = doc(useFirestore(), 'testsavedbook', 'savedbook1');
  // const { status, data } = useFirestoreDocData(bookRef);

  const [savedBooks, setSavedBooks] = useState([]);
  //useState is a hook that declares savedBooks as our state variable
  //useState has an argument of our initial state, in this case it is a blank array
  //useState takes the initial value of savedBooks. equivalent to state constructor in class component
  //setSavedBooks is a function that updates our current state (savedBooks). equivalent to setState that gets used in class component
  //App component will re-render whenever setSavedBooks is called

  const [completedBooks, setCompletedBooks] = useState([]);

  // const db = getFirestore();

  function saveToDb(books) {
    setDoc(doc(firestore, "testsavedbook", "savedbook1"), { savedBooks: books})
      .then(() => console.log("success"))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    //the function inside here will be called on at the end of each lifecycle (this is where i will get collection from firestore) and then call setSavedBooks and pass in the result (setSavedBooks will set the value of savedBooks)
    getDoc(doc(firestore, "testsavedbook", "savedbook1"))
      .then((res) => {
        if (res.exists()) {
          setSavedBooks(res.data().savedBooks);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  // second parameter of empty array means that this useEffect function will only be used one time, when the component mounts

  const handleClickSaved = (book) => {
    console.log("handle click saved from App reached");
    console.log(book);
    // const savedBooks = [];
    const newSavedBooksCollection = savedBooks.concat(book);
    // const newSavedBooksCollection = [...savedBooks, book]
    setSavedBooks(newSavedBooksCollection);
    saveToDb(newSavedBooksCollection);
    console.log(newSavedBooksCollection);
    console.log("click save and send to firestore")
    // savedBooksRef.doc().set({savedBooks})

    // db.collection("testsavedbook").doc("savedbook1").update({savedbooks: newSavedBooksCollection});

    // console.log(data);
    // console.log(status);
    //this is where i would add saved book to firestore "saved" collection
    // const savedBookRef = doc(useFirestore(), 'testsavedbook', 'savedbook1');
    // const { status, data } = useFirestoreDocData(savedBookRef);
    // firestore.collection("testsavedbook").doc("testbook").set({
    //   title: book.title,
    //   author: book.author
    // });
  }

  const handleClickRead = (book) => {
    console.log("handle click as read from App reached");
    console.log(book);
    const newCompletedBooksCollection = completedBooks.concat(book);
    setCompletedBooks(newCompletedBooksCollection);
    console.log(newCompletedBooksCollection);
    //this is where i would add a read book to firestore "completed" collection
  }

  const handleClickRemoveFromSaved = (id) => {
    console.log("handle click remove saved book from App reached");
    console.log(id);
    const newSavedBooksCollection = savedBooks.filter(book => book.id !== id);
    setSavedBooks(newSavedBooksCollection);
    console.log(newSavedBooksCollection);
    //this is where i would remove a read book from firestore "saved" collection
  }


  return (
    <FirestoreProvider sdk={firestore}>
      <BurritoTaste />
      <Router>
        <Header />
        <Switch>
          <Route path="/saved">
            <SavedList savedBooks={savedBooks}
                        onClickRead={handleClickRead} 
                        onClickRemoveFromSaved={handleClickRemoveFromSaved}/>
          </Route>
          <Route path="/history">
            <DoneReadList completedBooks={completedBooks} />
          </Route>
          <Route path="/">
            <BookControl onClickSaved={handleClickSaved}
                          onClickRead={handleClickRead} />
          </Route>
        </Switch>
      </Router>
    </FirestoreProvider>
  );
}

export default App;
