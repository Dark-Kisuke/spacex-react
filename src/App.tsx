import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {Container} from "@material-ui/core";
import {LaunchesList} from "./components/LaunchesList";
import {LaunchDetails} from "./components/LaunchDetails";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/launch/:id"
                 exact
                 render={(props) =>
                   <LaunchDetails launchId={props.match.params.id}/>
                 }>
          </Route>

          <Route path="/">
            <LaunchesList/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
