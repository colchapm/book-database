import React, { useState, useEffect } from "react";
import Header from "./Header";
import BookControl from "./BookControl";
import SavedList from "./SavedList";
import DoneReadList from "./DoneReadList";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import 'firebase/firestore';
import { useFirestoreDocData, useFirestore, FirestoreProvider, useFirebaseApp, useFirestoreCollection } from 'reactfire';
import { doc, getFirestore, setDoc, getDoc, addDoc } from 'firebase/firestore';
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

  // useEffect(() => {
  //   //the function inside here will be called on at the end of each lifecycle (this is where i will get collection from firestore) and then call setSavedBooks and pass in the result (setSavedBooks will set the value of savedBooks)
  //   getDoc(doc(firestore, "", "savedbook1"))
  //     .then((res) => {
  //       if (res.exists()) {
  //         setSavedBooks(res.data().savedBooks);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  // // second parameter of empty array means that this useEffect function will only be used one time, when the component mounts

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

  const handleClickRemoveFromSaved = (id) => {
    console.log("handle click remove saved book from App reached");
    console.log(id);
    const newSavedBooksCollection = savedBooks.filter(book => book.id !== id);
    setSavedBooks(newSavedBooksCollection);
    console.log(newSavedBooksCollection);
    //this is where i would remove a read book from firestore "saved" collection
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
    <Link to="/singin">Sign In</Link> :
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
                          onClickRemoveFromSaved={handleClickRemoveFromSaved}/>
            </Route>
            <Route path="/history">
              <DoneReadList completedBooks={completedBooks} />
            </Route>
            <Route path="/">
              { userId === null ? 
                <Redirect to="/signin" /> :
                  <BookControl onClickSaved={handleClickSaved}
                  onClickRead={handleClickRead} />
              }
            </Route>
          </Switch>
        </div>
        </Router>
    </FirestoreProvider>
  );
}

export default App;
