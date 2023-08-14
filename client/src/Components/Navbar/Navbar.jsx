import { useState } from "react";
// import AvatarLogo from "../../assets/logo.png"
import Logo from "../../assets/logo.png";
import Login from "./Login/loginForm"
import SignUp from "./Signup/signup"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
  Link,

  User,
} from "@nextui-org/react";


import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../utils/queries";






// `Log Out as ${userName.username}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, loading } = useQuery(GET_USER);

  const userOfficialName = data?.user || {}
  console.log(userOfficialName)
  
  
  const menuItems = ["Profile", "Dashboard","LogOut"];

  return (
    <div>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <img
              style={{
                aspectRatio: "1",
                width: "3rem",
              }}
              src={Logo}
              alt="Logo"
            />
            {/* <p className="font-bold text-inherit">Music IO</p> */}
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        {Auth.loggedIn() ? (
          <>
            <NavbarContent justify="end">
              <User
                isbordered="true"
                name={userOfficialName.username}
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702e",
                }}


              />
            </NavbarContent>
          </>
        ) : (
          <>
            <NavbarContent justify="end" >
           
              <NavbarItem >
                <SignUp  />
            
              </NavbarItem>
            </NavbarContent>
            <Login/>
          </>
        )}

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

    
    </div>
  );
}

