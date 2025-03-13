import { useContext } from "react";
import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import ModeContext from "../contexts/ModeContext"; // Ensure you import ModeContext

const LoginPage = () => {
  const { mode } = useContext(ModeContext);

  return (
    <Wrapper>
      <h1>Login</h1>
      <AuthForm isRegister={false} />
      <Link to="/register" style={{ display: "block", textAlign: "center" }}>
        Don't have an account? Register here!
      </Link>
    </Wrapper>
  );
};

export default LoginPage;
