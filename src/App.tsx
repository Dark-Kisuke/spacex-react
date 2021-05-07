import {Container} from '@material-ui/core';
import React from 'react';
import {RouteComponentProps} from 'react-router';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import LaunchDetails from './components/LaunchDetails';
import LaunchesList from './components/LaunchesList';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/launch/:id"
                 exact
                 render={(props: RouteComponentProps<any>) =>
                   <LaunchDetails launchId={props.match.params.id}/>
                 }
          >
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
