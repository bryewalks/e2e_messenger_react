import React from 'react';
import './index.css';
import { Route, 
          BrowserRouter as Router, 
          Switch 
        } from 'react-router-dom'
import App from './App';

export const Routes = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}