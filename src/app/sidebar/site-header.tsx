"use client"

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import React from "react";

export function SiteHeader() {

  const pathname = usePathname()
  const pageName = pathname === "/" ? "Home" : pathname.split("/").pop()


  return (
    <>
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium text-black dark:text-white">{pageName}</h1>

      </div>

      <ModeToggle/>
    </header>

    </>
  )
}
