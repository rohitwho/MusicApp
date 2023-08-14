
import {Popover, PopoverTrigger, PopoverContent,  User,Input} from "@nextui-org/react";
import {UserTwitterCard} from "./UserTwitterCard";

export default function PopOver() {
  return (
    <Popover showArrow placement="right">
      <PopoverTrigger>
        <User   
          as="button"
          name="Zoe Lang"
          description="Product Designer"
          className="transition-transform"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
          }}
        />
      </PopoverTrigger>
      <Input
      isReadOnly
      type="text"
      label="Comment"
      variant="bordered"
      defaultValue="really good Music"
      className="max-w-xs"
    />
      <PopoverContent className="p-1">
        <UserTwitterCard />
      </PopoverContent>
    
    </Popover>
  );
}
