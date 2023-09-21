import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Admindashboard from './features/admindashboard/Admindashboard';
import Addhotel from './features/admindashboard/Addhotel';
import Addrooms from './features/admindashboard/Addrooms';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/admindashboard',
        element:<Admindashboard></Admindashboard>,
        children:[
          {
            path:'/admindashboard/addhotel',
            element:<Addhotel></Addhotel>
          },
          {
            path:'/admindashboard/addrooms',
            element:<Addrooms></Addrooms>
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
