import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Email from './Pages/Login/email';
import SignUp from './Pages/Login/signup';
import Favorite from './Pages/Favorite/Favorite';
import Hidden from './Pages/Login/headerHidden';

function App() {
  return (
    <Router>
      <Hidden />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/email" component={Email} />
        <Route exact path="/signup/email" component={SignUp} />
        <Route exact path="/main/items/:id" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/favorite" component={Favorite} />
      </Switch>
    </Router>
  );
}

export default App;
