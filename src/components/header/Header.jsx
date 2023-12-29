import React from "react";
import { Button, Container } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authService } from "../../services/auth";
const Header = () => {
  const { userData, isUserActive } = useSelector(
    (state) => state.userSliceReducer
  );

  const navItems = [
    {
      name: "home",
      url: "/",
      active: isUserActive,
    },
    {
      name: "post",
      url: "/post",
      public: true,
    },
    {
      name: "add post",
      url: "/add-post",
      active: isUserActive,
    },
    {
      name: "login",
      url: "/login",
      active: !isUserActive,
    },
    {
      name: "signup",
      url: "/signup",
      active: !isUserActive,
    },
  ];

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
            {navItems.map((item) => {
              if (item.active) {
                return (
                  <Link
                    key={item.name}
                    className="hover:text-white"
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                );
              } else if (item.public) {
                return (
                  <Link className="hover:text-white" to={item.url}>
                    {item.name}
                  </Link>
                );
              }
            })}
            {isUserActive && (
              <Button
                onClick={logoutHanddler}
                className="bg-red-500 hover:bg-red-600 text-white"
                type="button"
              >
                Logout
              </Button> 
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
