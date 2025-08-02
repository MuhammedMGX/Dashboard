
import * as React from "react"
import { DataTable } from "./products-table"
import { getProducts } from "../_api/fetch"



export default async function Products() {


      const Products = await getProducts()

  return (
    <>
        <DataTable data={Products} />
    </>
  )

}

