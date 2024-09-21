import './style.scss';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import NavBar from './components/navBar/NavBar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { useContext, useEffect, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthContext } from './context/authContext';

function App() {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <NavBar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: '6' }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  };

  const ProtectedRoute = ({ children }) => {

    if (!currentUser) {
      return <Navigate to="/login" />
    }    

    return children;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;

