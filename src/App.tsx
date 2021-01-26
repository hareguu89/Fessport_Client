import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './containers/NavContainer';
import HomePage from './pages/HomePage';
import FessportPage from './pages/FessportPage';
import FestivalListPage from './pages/FestivalListPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import Footer from './containers/FooterContainer';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/fessport" component={FessportPage} />
        <Route path="/festival/list" component={FestivalListPage} />
        <Route path="/festival/detail/:_id" component={FestivalDetailPage} />
        <Route path="/test" component={Footer} />
        <Redirect from="*" to="/" />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
