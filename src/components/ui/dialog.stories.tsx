import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="p-6 rounded-lg border bg-background">
        <DialogClose className="absolute right-4 top-4 rounded-xs opacity-70">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="flex flex-col items-start gap-1.5">
          <DialogTitle className="text-foreground text-lg font-semibold">Dialog title</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            This is a dialog description.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground text-sm font-medium">
              Name
            </Label>
            <Input id="name" placeholder="Placeholder" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-foreground text-sm font-medium">
              Username
            </Label>
            <Input id="username" placeholder="Placeholder" />
          </div>
        </div>
        <DialogFooter className="flex justify-end items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta: Meta<typeof DialogDemo> = {
  title: "Molecules/Dialog",
  component: DialogDemo,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DialogDemo>;

export const Default: Story = {
  render: () => <DialogDemo />,
};

