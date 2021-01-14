import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "../Routes/Home";

const App = () => (
  <BrowserRouter>
    <>
      {/* <Navi /> */}
      <Switch>
        <Route exact path={"/"} component={Home} />
        {/* <Route path="/user/userinfo" component={UserInfo} />
        <Route path="/user/mygoods" component={MyGoods} />
        <Route path="/goods/detail/:id" component={GoodsDetail} />
        <Route path="/goods/edit/:id" component={GoodsEdit} />
        <Route path="/goods/post" component={GoodsPost} /> */}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default App;
