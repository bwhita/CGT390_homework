import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom"; // Correct import for Link

const RegisterPage = () => {
  return (
    <Wrapper>
      <h1>Register</h1>
      <AuthForm isRegister={true} />
    </Wrapper>
  );
};

export default RegisterPage;
