import React, { useState } from "react";
import Header from "./Header";
import BookControl from "./BookControl";
import SavedList from "./SavedList";
import DoneReadList from "./DoneReadList";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";


function App() {

  const firestore = getFirestore(useFirebaseApp());

  const [savedBooks, setSavedBooks] = useState([]);
  //useState is a hook that declares savedBooks as our state variable
  //useState has an argument of our initial state, in this case it is a blank array
  //useState takes the initial value of savedBooks. equivalent to state constructor in class component
  //setSavedBooks is a function that updates our current state (savedBooks). equivalent to setState that gets used in class component
  //App component will re-render whenever setSavedBooks is called

  const [completedBooks, setCompletedBooks] = useState([]);
  const [userId, setUserId] = useState(null);

  function saveToSavedDb(userId, books) {
    console.log("saveToSavedDb fnction reached");
    setDoc(doc(firestore, "savedbooks", userId), { savedBooks: books})
      .then(() => console.log("success"))
      .catch((err) => console.error(err));
  }

  function saveToCompletedDb(userId, books) {
    console.log("saveToCompletdDb fnction reached");
    setDoc(doc(firestore, "completedbooks", userId), { completedBooks: books})
      .then(() => console.log("success"))
      .catch((err) => console.error(err));
  }

  const getSavedBooksFromDb = (userId) => {
    console.log("getSavedBooksFromDb function reached")
    console.log(userId);
    getDoc(doc(firestore, "savedbooks", userId))
      .then((resource) => {
        if (resource.exists()) {
          setSavedBooks(resource.data().savedBooks);
        }
      })
      .catch((error) => console.error(error));
  }

  const getCompletedBooksFromDb = (userId) => {
    console.log("getCompletedBooksFromDb function reached")
    console.log(userId);
    getDoc(doc(firestore, "completedbooks", userId))
      .then((resource) => {
        if (resource.exists()) {
          setCompletedBooks(resource.data().completedBooks);
        }
      })
      .catch((error) => console.error(error));
  }

  const handleClickSaved = (book) => {
    console.log("handle click saved from App reached");
    console.log(book);
    // const savedBooks = [];
    const newSavedBooksCollection = savedBooks.concat(book);
    // const newSavedBooksCollection = [...savedBooks, book]
    console.log(newSavedBooksCollection);
    setSavedBooks(newSavedBooksCollection);
    saveToSavedDb(userId, newSavedBooksCollection);
    console.log("click save and send to firestore")
  }

  const handleClickRead = (book) => {
    console.log("handle click as read from App reached");
    console.log(book);
    const newCompletedBooksCollection = completedBooks.concat(book);
    setCompletedBooks(newCompletedBooksCollection);
    console.log(newCompletedBooksCollection);
    saveToCompletedDb(userId, newCompletedBooksCollection);
    //this is where i would add a read book to firestore "completed" collection
  }

  const handleRemoveBookFromSaved = (title) => {
    console.log("handle click remove saved book from App reached");
    console.log(title)
    const newSavedBooksCollection = savedBooks.filter(book => book.volumeInfo.title !== title);
    console.log(newSavedBooksCollection);
    setSavedBooks(newSavedBooksCollection);
    saveToSavedDb(userId, newSavedBooksCollection);
    //this is where i would remove a read book from firestore "saved" collection
  }

  const handleRemoveBookFromCompleted = (title) => {
    console.log('handleRemoveBookFromCompleted on app reached');
    const newCompletedBooksCollection = completedBooks.filter(book => book.volumeInfo.title !== title);
    setCompletedBooks(newCompletedBooksCollection);
    saveToCompletedDb(userId, newCompletedBooksCollection);
  }

  const handleLoginSuccess = (user) => {
    console.log(user);
    setUserId(user.uid);
    getSavedBooksFromDb(user.uid);
    getCompletedBooksFromDb(user.uid);
  }

  const handleLogOutSuccess = (user) => {
    console.log(user);
    setUserId(null);
    setSavedBooks([]);
    setCompletedBooks([]);
  }

  const links = userId === null ?
    <Link to="/">Home</Link> :
    <>
      <Link to="/">Home</Link> | <Link to="/saved">Saved</Link> | <Link to="/history">History</Link> | <Link to="/signout">Sign Out</Link>
    </>

  return (
    <FirestoreProvider sdk={firestore}>
      <Router>
        {links}
        <div>
          {userId === null ? " " : `User Id: ${userId}`}
        </div>
        <Header />
        <div>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signout">
              <SignOut onSuccess={handleLogOutSuccess} />
            </Route>
            <Route path="/signin">
              <SignIn onSuccess={handleLoginSuccess} />
            </Route>
            <Route path="/saved">
              <SavedList savedBooks={savedBooks}
                          onClickRead={handleClickRead} 
                          onClickRemoveBookFromSaved={handleRemoveBookFromSaved}/>
            </Route>
            <Route path="/history">
              <DoneReadList completedBooks={completedBooks}
                            onClickRemoveBookFromCompleted={handleRemoveBookFromCompleted} />
            </Route>
            <Route path="/">
              { userId === null ? 
                <Redirect to="/signin" /> :
                  <BookControl onClickSaved={handleClickSaved}
                  onClickRead={handleClickRead}/>
              }
            </Route>
          </Switch>
        </div>
        </Router>
    </FirestoreProvider>
  );
}

export default App;
