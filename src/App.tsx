import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Nav from './containers/NavContainer';
import HomePage from './pages/HomePage';
import FessportPage from './pages/FessportPage';
import FestivalListPage from './pages/FestivalListPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import CompanionPage from './pages/CompanionPage';
import CommunityPostPage from './pages/CommunityPostPage';
import ResellPage from './pages/ResellPage';
import ArtistListPage from './pages/ArtistListPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import Footer from './containers/FooterContainer';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/festival/list" component={FestivalListPage} />
        <Route path="/festival/detail/:id" component={FestivalDetailPage} />
        <Route path="/artist/list" component={ArtistListPage} />
        <Route path="/artist/detail/:_id" component={ArtistDetailPage} />
        <Route path="/companion" component={CompanionPage} />
        <Route path="/resell" component={ResellPage} />
        <Route path="/post" component={CommunityPostPage} />
        <Route path="/fessport" component={FessportPage} />
        <Redirect from="*" to="/" />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
