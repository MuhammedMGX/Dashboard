import { ChartAreaInteractive } from "@/app/dashboard/chart-area-interactive"
import { SectionCards } from "@/app/dashboard/section-cards"
import { SiteHeader } from "@/app/sidebar/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { AppSidebar } from "../sidebar/page"
import { getProducts } from "../_api/fetch"
import { DataTable } from "../products/products-table"




export default async function Dashboard() {

const Products = await getProducts()


  return (
    
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={Products} />
            </div>
          </div>
        </div>
  )
}
