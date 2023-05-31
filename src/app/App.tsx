import React from 'react';
import './App.css';
import './custom.scss'
import { AppRouter } from "../router/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
        <AppRouter/>
    </div>
  );
}

export default App;
