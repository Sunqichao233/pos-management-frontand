import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { Wallet } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Wallet className="mr-2 h-4 w-4" /> <span>Accept payments</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Accept Payments</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}
