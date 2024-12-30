import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MedicineList from './components/MedicineList';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Medicines</a>
            </li>
            <li>
              <a href="/students">Students</a>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={MedicineList} />
          <Route path="/students" component={StudentList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
