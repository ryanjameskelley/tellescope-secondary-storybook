import * as React from "react";
import { 
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from "./menubar";

// Reusable MenuBar SubTrigger Component
export function StoryMenubarSubTrigger({ 
  children, 
  subContent,
  className,
  ...props 
}: {
  children: string;
  subContent: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof MenubarSubTrigger>) {
  return (
    <MenubarSub>
      <MenubarSubTrigger className={className} {...props}>
        {children}
      </MenubarSubTrigger>
      <MenubarSubContent>
        {subContent}
      </MenubarSubContent>
    </MenubarSub>
  );
}