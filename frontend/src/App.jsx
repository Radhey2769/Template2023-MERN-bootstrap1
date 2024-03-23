import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./components/admin";
import Main from "./components/main";
import Signin from "./components/main/Signin";
import Signup from "./components/main/Signup";
import Home from "./components/main/Home";
import UserAuth from "./auth/UserAuth";
import User from "./components/user";
import UserProfile from "./components/user/UserProfile";
import AdminProfile from "./components/admin/AdminProfile";
import NotFound from "./components/NotFound";
import AdminAuth from "./auth/AdminAuth";
import UserProvider from "./context/UserProvider";
import AdminProvider from "./context/AdminProvider";
import { useState } from "react";
import About from "./components/main/About";
import Contact from "./components/main/Contact";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import { SnackbarProvider } from 'notistack';
import './App.css'
import CreateTournament from "./components/user/CreateTournament";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [currentAdmin, setCurrentAdmin] = useState(
    JSON.parse(sessionStorage.getItem("admin"))
  );

  return (

    <BrowserRouter>
      <SnackbarProvider maxSnack={5} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <AdminProvider currentUser={currentAdmin}>
          <UserProvider currentUser={currentUser}>
            <Routes>
              <Route element={<Navigate to="/main/home" />} path="/" />
              <Route
                element={
                  // <AdminAuth>
                  // </AdminAuth>
                  <Admin />
                }
                path="admin"
              >
                <Route element={<AdminProfile />} path="profile" />

              </Route>

              <Route element={<Main />} path="main">
                <Route element={<Home />} path="home" />
                <Route element={<Signin />} path="signin" />
                <Route element={<Signup />} path="signup" />
                <Route element={<About />} path="about" />
                <Route element={<Contact />} path="contact" />
                <Route element={<Header />} path="header" />
                <Route element={<Footer />} path="footer" />
                <Route element={<CreateTournament />} path="createtournament" />
              </Route>

              <Route
                element={
                  // <UserAuth>
                  // </UserAuth>
                  <User />
                }
                path="user"
              >
                <Route path="profile" element={<UserProfile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </AdminProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
