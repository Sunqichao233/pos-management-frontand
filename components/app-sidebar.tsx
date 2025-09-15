"use client"

import * as React from "react"
import {
  LifeBuoy,
  Send,
  Settings,
  SquareTerminal,
  House,
  Globe,
  IdCard,
  Landmark,
  Grip,
  UsersRound,
  ReceiptText,
  Tag 
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavTop } from "@/components/nav-top"
import { NavBottom } from "./nav-bottom"
import { NavSecondary } from "@/components/nav-secondary"
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: House,
      isActive: true,
    },
    {
      title: "Products and Services",
      url: "/dashboard/products-and-services",
      icon: Tag,
      items: [
        {
          title: "merchandise",
          url: "/merchandise",
          items: [
            {
              title: "test",
              url: "/test",
            }
          ],
        },
        {
          title: "menu",
          url: "/menu",
        },
        {
          title: "Inventory management",
          url: "/inventory-management",
          items: [
            {
              title: "history",
              url: "/history",
            },
            {
              title: "Business Partners",
              url: "/business-partners",
            }
          ],
        },
        {
          title: "Gift cards",
          url: "/gift-cards",
          items: [
            {
              title: "test",
              url: "/test",
            }
          ],
        },
        {
          title: "Subscription Plans",
          url: "/subscription-plans",
        }
      ],
    },
    {
      title: "Billing and Payments",
      url: "#",
      icon: ReceiptText,
    },
    {
      title: "Online Business",
      url: "#",
      icon: Globe,
    },
    {
      title: "Customers",
      url: "#",
      icon: IdCard,
    },
    {
      title: "Report",
      url: "/dashboard/report",
      icon: SquareTerminal,
      items:[
        {
          title: "Sales Summary",
          url: "/sales-summary",
        },
        {
          title: "Sales by product",
          url: "/sales-by-product",
        },
        {
          title: "Sales Trends",
          url: "/sales-trends",
        },
        {
          title: "Sales by category",
          url: "/sales-by-category",
        },
        {
          title: "Sales by staff",
          url: "/sales-by-staff",
        },
        {
          title: "Customized Sales",
          url: "/customized-sales",
        },
        {
          title: "Gift cards",
          url: "/gift-cards",
        },
        {
          title: "Sales by section",
          url: "/sales-by-section",
        },
        {
          title: "Sales to business partners",
          url: "/sales-to-business-partners",
        },
        {
          title: "Sales test1",
          url: "/sales-test1",
        },
        {
          title: "Sales test2",
          url: "/sales-test2",
        },
      ]
    },
    {
      title: "staff",
      url: "#",
      icon: UsersRound,
    },
    {
      title: "bank",
      url: "/dashboard/bank",
      icon: Landmark,
    },
    {
      title: "setting",
      url: "/dashboard/setting",
      icon: Settings,
      items: [
        {
          title : "Account and Settings",
          url : "/account-and-settings",
          items: [
            {
              title : "test",
              url : "/test",
            }
          ]
        },
        {
          title : "Device Management",
          url : "/device-management",
          items: [
            {
              title : "Terminal",
              url : "/terminal",
            },
            {
              title : "profile",
              url : "/profile",
            },
            {
              title : "Terminal Code",
              url : "/terminal-code",
            },
            {
              title : "mode",
              url : "/mode",
            },
            {
              title : "kitchen display",
              url : "/kitchen-display",
            },
            {
              title : "kiosk",
              url : "/kiosk",
            },
          ]
        },
        {
          title : "Restaurant Pos setup",
          url : "/restaurant-pos-setup",
          items: [
            {
              title : "test",
              url : "/test",
            }
          ]
        },
      ],
    },
    {
      title: "Add more",
      url: "#",
      icon: Grip,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset"
      {...props}
      >
      <SidebarHeader>
        <NavTop />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavBottom />
      </SidebarFooter>
    </Sidebar>
  )
}
