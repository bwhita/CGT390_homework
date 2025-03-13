import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";


const NotFound = () => {


  return(
        <Wrapper>
          <h1>404</h1>
          <Link to = "/"style = {{display: "block", textAlign: "center"}}>Go back to Home</Link>
        </Wrapper>
  );
};

export default NotFound
