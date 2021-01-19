import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './containers/NavContainer';
import HomePage from './pages/HomePage';
import FestivalListPage from './pages/FestivalListPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import Footer from './containers/FooterContainer';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/festival/list" component={FestivalListPage} />
        <Route path="/festival/detail/:id" component={FestivalDetailPage} />
        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
