import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  Button, Input, } from "@nextui-org/react";
import MailFilledIcon from './Navbar/MailIcon';
import {LockIcon} from './Navbar/LockIcon';

export default function SignUpPage(){


console.log("hello")

    return(
      <>
      <Modal>
         <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sign Up </ModalHeader>
            <ModalBody>
            <Input
                autoFocus
                endContent={
                  <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
          
              />
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
              <div className="flex py-2 px-1 justify-between">
  {/* <Link color="Primary"onPress={function(){
  SignUpPage()
  }} nsize="sm">Sign Up?</Link> */}
              
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
      
      
      </>
    )
  }
  