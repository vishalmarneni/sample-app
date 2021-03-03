import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';
import UsersTable from './components/UsersTable'
import CssBaseline from '@material-ui/core/CssBaseline'

const environment = process.env.NODE_ENV;
const sampleTest = process.env.REACT_APP_ENV_TEST;

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
          {environment} - {sampleTest}
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <UsersTable />
    </div>
  );
}

export default App;
