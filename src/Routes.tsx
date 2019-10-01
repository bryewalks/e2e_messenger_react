import React from 'react';
import './index.css';
import { Route, 
          BrowserRouter as Router, 
          Switch 
        } from 'react-router-dom'
import LoginView from 'views/auth/LoginView'
import ConversationsIndex from 'views/conversations/ConversationsIndex'

export const Routes = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LoginView} />
            <Route path="/login" component={LoginView} />
            <Route exact path="/conversations" component={ConversationsIndex} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}