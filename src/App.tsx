import React from 'react';
import { RouterProvider } from 'react-router-dom';
import DataContetProvider from './context/DataProvider';
import { Router } from './Router';


function App() {
  return (
    <div style={{height: '100%'}}>
      <DataContetProvider>
          <RouterProvider router={Router}/>
      </DataContetProvider>
    </div>
  );
}

export default App;
