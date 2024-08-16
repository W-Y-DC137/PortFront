import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import PageClient from '../pages/PageAcceuilClient';
import PageAgent from '../pages/PageAceuilAgent';
import PageAdmin from '../pages/PageAcceuilAdmin';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/client" component={PageClient} />
                <PrivateRoute path="/agent" component={PageAgent} />
                <PrivateRoute path="/admin" component={PageAdmin} />
            </Switch>
        </Router>
    );
};

// PrivateRoute Component to protect routes
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

export default App;