
import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png"
import {Navbar, NavbarBrand, NavbarContent,NavbarMenuToggle ,NavbarMenuItem,NavbarMenu, NavbarItem, Link, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure, Checkbox, Input} from "@nextui-org/react";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import MailFilledIcon from './MailIcon';
import {LockIcon} from './LockIcon';
import Auth from '../../utils/auth';
import { LOGIN_USER } from "../../utils/mutation";


export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {data } = useQuery(GET_MESSAGES);


  const userName = data?.user[0]|| {};
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  const menuItems = [
    "Profile",
    "Dashboard",
    `Log Out as ${userName.username}`,
  ];

    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
    const handleInputChange = (event) => {
    //   const { name, value} = event.target;
      setUserFormData({ ...userFormData });
    };
    console.log(setUserFormData)
  
    const [loginUser, {error}] = useMutation(LOGIN_USER);
  
    // useEffect(() => {
    //   if (error) {
    //     setShowAlert(true);
    //   } else {
    //     setShowAlert(false);
    //   }
    // }, [error]);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const { data } = await loginUser({
          variables: { ...userFormData }
        });
  
        if (!data) {
          throw new Error('something went wrong!');
        }
  
        console.log(data);
        Auth.login(data.login.token);
  
      } catch (err) {
        console.error(err);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };
    return (
    <div>
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
       <img  style={{
        aspectRatio:"1",
        width:"3rem"
       }}src= {Logo} alt="Logo" />  
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
          <Button  onPress={onOpen} as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
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



  <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    placement="top-center"
    noValidate validated={validated}
    onSubmit={handleFormSubmit}>
   <ModalContent>
     {(onClose) => (
        <>
        {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert> */}
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
              value={userFormData.email}
              onValueChange={handleInputChange}
              name='email'
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
              value={userFormData.password}
              onValueChange={handleInputChange}
              name='password'
            />
            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" 
              onPress={onClose}
              isDisabled={(userFormData.email && userFormData.password)}
              type='submit'
              variant='faded'
              >
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





