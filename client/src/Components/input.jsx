import React from "react";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react"

export default function input() {
  return (
    <div>
        <Input
          isClearable
          type="email"
          label="Message"
          variant="bordered"
     
         
          onClear={() => console.log("input cleared")}
          className=" max-xl:"
          />
      <Button color="primary" variant = "ghost">Send</Button>
    </div>
  );
}
