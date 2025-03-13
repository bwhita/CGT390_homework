import React, { useEffect } from 'react';
import { HashRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import Navbar from './components/Navbar';
import { useContext } from 'react';
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import NewsPage from './pages/NewsPage';
import ModeContext from './contexts/ModeContext';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  const { mode, setMode } = useContext(ModeContext);

  const updateMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <AuthProvider>
      <HashRouter>
    <div className={mode}>
      <header>
        <Navbar mode={mode} updateMode={updateMode} />
      </header>
      <main>
        <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/news" element = {<NewsPage mode={mode}/>} />
          <Route path = "login" element = {<LoginPage />} />
          <Route path = "register" element = {<RegisterPage />} />
          <Route path = "*" element = {<NotFound />} />
        </Routes>
      </main>
    </div>
    </HashRouter>
    </AuthProvider>
  );
}

export default App