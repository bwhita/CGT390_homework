import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import styles from "../styles/navbar.module.css";

const Navbar = ({ mode, updateMode }) => {

  const { isLogin, logout } = useContext(AuthContext);
  const isDarkMode = mode === 'dark';

  return (
    <nav className={`${styles.navbar} ${isDarkMode ? styles.dark : styles.light}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Search-Page">Search</Link>
        </li>
        <li>
          <Link to="/News">News</Link>
        </li>
      </ul>
      {isLogin ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
      <button
        className={`${mode === "light" ? styles.lightModeBtn : styles.darkModeBtn}`}
        onClick={updateMode}
      >
        {mode === "light" ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
