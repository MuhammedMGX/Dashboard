"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconCirclePlusFilled,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMail,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter } from "next/navigation"





const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconChartBar,
    },
    {
      title: "Charts",
      url: "/charts",
      icon: ShoppingCart ,
    },
    {
      title: "Users",
      url: "/users",
      icon: IconUsers,
    },

  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },

  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const pathname = usePathname();


  const [username, setUsername] = React.useState<string | null>(null)
  function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}


  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0"; 
    window.location.href = "/login"; 
  };


React.useEffect(() => {
const token = getCookie("token")
if (token) {
  const decoded = JSON.parse(atob(token))
  setUsername(decoded.username)
}
}, [])

const { isMobile } = useSidebar()


  return (
  <>

    
    <Sidebar collapsible="offcanvas" {...props}>


      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">{username} Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>

    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {data.navMain.map((item) => (
         <Link key={item.title} href={item.url}>          
           <SidebarMenuItem key={item.title}>
               <SidebarMenuButton tooltip={item.title} className={item.url === pathname ? "dark:bg-[#E5E5E5] bg-[#171717] dark:text-black text-white font-semibold " : ""}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            </Link> 
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>



    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className={item.url === pathname ? "dark:bg-[#E5E5E5] bg-[#171717] dark:text-black text-white font-semibold " : ""}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>



      </SidebarContent>
      <SidebarFooter>

        <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={data.user.avatar} alt={data.user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{username}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {data.user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data.user.avatar} alt={data.user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{username}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {data.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                <Link href="/settings">Account</Link> 
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                <Link href="/settings">Billing</Link> 
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                <Link href="/settings">Notifications</Link> 
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <a onClick={() => (handleLogout())}>
                <DropdownMenuItem>
                <IconLogout />
                Log out
                </DropdownMenuItem>
            </a>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>


      </SidebarFooter>
    </Sidebar>

  </>
  )
}
