import React from 'react'
import './App.css';
import AppRouter from './Routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/font-awesome/css/all.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import rootReducer from "./reducer/RootReducer";
// import { BrowserRouter } from "react-router-dom";



function App() {
  let store = createStore(rootReducer);
  return (
    <div className="App"> 
    <Provider store={store}>
  
      <AppRouter />
     
    </Provider>

    </div>
  );
}

export default App;
