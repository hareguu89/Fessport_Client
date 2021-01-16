import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './containers/NavContainer';
import Home from './containers/HomeContainer';
import Footer from './containers/FooterContainer';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
