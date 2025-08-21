import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, ChevronDown } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbEllipsis,
} from "./breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { StoryDropdownMenuItem } from "./story-dropdown-menu-item";

// Custom args interface for breadcrumb controls
interface BreadcrumbStoryArgs {
  showDropdown: boolean;
  showEllipsis: boolean;
}

const meta: Meta<BreadcrumbStoryArgs> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showDropdown: { control: "boolean" },
    showEllipsis: { control: "boolean" },
  },
  args: {
    showDropdown: true,
    showEllipsis: true,
  },
  render: (args) => (
    <Breadcrumb className="flex items-start gap-2.5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="text-muted-foreground text-sm">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator>
          <ChevronRight className="h-[15px] w-[15px] text-muted-foreground" />
        </BreadcrumbSeparator>
        
        {args.showEllipsis && (
          <>
            <BreadcrumbItem>
              {args.showDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <BreadcrumbEllipsis className="text-muted-foreground cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <StoryDropdownMenuItem>Documentation</StoryDropdownMenuItem>
                    <StoryDropdownMenuItem>Themes</StoryDropdownMenuItem>
                    <StoryDropdownMenuItem>GitHub</StoryDropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <BreadcrumbEllipsis className="text-muted-foreground" />
              )}
            </BreadcrumbItem>
            
            <BreadcrumbSeparator>
              <ChevronRight className="h-[15px] w-[15px] text-muted-foreground" />
            </BreadcrumbSeparator>
          </>
        )}
        
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="text-muted-foreground text-sm">
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator>
          <ChevronRight className="h-[15px] w-[15px] text-muted-foreground" />
        </BreadcrumbSeparator>
        
        <BreadcrumbItem>
          <BreadcrumbPage className="text-foreground text-sm">
            Breadcrumb
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export default meta;
type Story = StoryObj<BreadcrumbStoryArgs>;

export const Default: Story = {
  args: {
    showDropdown: true,
    showEllipsis: true,
  },
};