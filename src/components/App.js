import React from "react";
import Header from "./Header";
import BookControl from "./BookControl";
import SavedList from "./SavedList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/saved">
          <SavedList />
        </Route>
        <Route path="/">
          <BookControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
