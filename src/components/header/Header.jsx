import React from "react";
import { Button, Container } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authService } from "../../services/auth";
const Header = () => {
  const { userData, isUserActive } = useSelector(
    (state) => state.userSliceReducer
  );
  console.log(userData,isUserActive);
  const logoutHanddler = async () => {
    try {
      const response = await authService.logout();
      console.log("logout user response", response);
    } catch (error) {
      console.log("Failed in LogoutHanddler ::", error.message);
    }
  };
  return (
    <header className="bg-blue-500 h-[60px] flex items-center">
      <Container>
        <nav className="flex justify-between items-center">
          <Link className="text-2xl font-bold uppercase">Logo</Link>

          <div className="flex capitalize gap-2 items-center font-semibold">
            <Link className="hover:text-white" to="/">
              Home
            </Link>
            <Link className="hover:text-white" to="/posts">
              Posts
            </Link>
            <Link className="hover:text-white" to="/login">
              login
            </Link>
            <Link className="hover:text-white" to="/signup">
              signup
            </Link>
            <Button
              onClick={logoutHanddler}
              className="bg-red-500 hover:bg-red-600 text-white"
              type="button"
            >
              Logout
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
