import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import MailFilledIcon from "./MailIcon";
import { LockIcon } from "./LockIcon";
// import HandleSignUp from "../HandleSignUp"

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useQuery(GET_MESSAGES);
  const [userSignupData,setUserSignup]= useState({username:"",email:"",password:""})
console.log(userSignupData)

  const userName = data?.user[0] || {};

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const inputhandler = (event) => {
    const { name, value } = event.target;
    setUserSignup({ ...userSignupData, [name]: value });
  };

 const  handleSignUp = async (e)=>{
  e.preventDefault()


try{
  const response = await signUp({
    variables:{...userSignupData}
  })
}catch(err){
  console.log(err)
}





}

  const menuItems = ["Profile", "Dashboard", `Log Out as ${userName.username}`];

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
            <p className="font-bold text-inherit">Music IO</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              onPress={onOpen}
              as={Link}
              color="primary"
              href="#"
              variant="flat"
            >
              Log In
            </Button>
          </NavbarItem>
        </NavbarContent>

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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sign Up{" "}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }name="username"
                  value={userSignupData.username}
                  onChange={inputhandler}
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                />
                <Input
                  autoFocus
                  endContent={
                    <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="email"
                  value={userSignupData.email}
                  onChange={inputhandler}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  name="password"
                  value={userSignupData.password}
                  onChange={inputhandler}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link className=" cursor-pointer">LogIn?</Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

{
  /* <Checkbox
classNames={{
  label: "text-small",
}}
>
Remember me
</Checkbox> */
}

{
  /* <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    placement="top-center"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              endContent={
                <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
        
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
            <div className="flex py-2 px-1 justify-between cursor-pointer">
<Link color="Primary"onPress={
SignUpPage
}

nsize="sm" >Sign Up?</Link>
            
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Sign in
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal> */
}
