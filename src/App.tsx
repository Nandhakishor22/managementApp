import React from 'react';
import { RouterProvider } from 'react-router-dom';
import DataContetProvider from './context/DataProvider';
import { Router } from './Router';
import ThemeContext from './context/ThemeContext';


function App() {
  return (
    <div style={{height: '100%'}}>
      <ThemeContext>
      <DataContetProvider>
          <RouterProvider router={Router}/>
      </DataContetProvider>
      </ThemeContext>
     
    </div>
  );
}

export default App;
