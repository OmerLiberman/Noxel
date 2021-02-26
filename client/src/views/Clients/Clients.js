import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Classrooms from './views/Classrooms/Classrooms';
import Schools from './views/Schools/Schools';
import Payers from './views/Payers';


const Clients = () => {

  return (
      <div style={{display: 'flex', flexDirection: 'column', direction: 'rtl', padding: 10}}>
        <Router>
          <Switch>
            <Route path='*/classrooms' exact component={Classrooms}/>
            <Route path='*/schools' exact component={Schools}/>
            <Route path='*/payers' exact component={Payers}/>
          </Switch>
        </Router>

      </div>
  );
};

export default Clients;