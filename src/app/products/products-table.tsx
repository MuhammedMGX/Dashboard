"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconPlus,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { toast } from "sonner"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { SearchIcon } from "lucide-react"
import { deleteProducts, getOneProduct, updateProducts } from "../_api/fetch"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react"
import { dataInfo } from "../_interface/dataInfo"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Textarea } from "@/components/ui/textarea";



const schema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
  }),
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string(),
      date: z.string(),
      reviewerName: z.string(),
      reviewerEmail: z.string(),
    })
  ),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    barcode: z.string(),
    qrCode: z.string(),
  }),
  thumbnail: z.string(),
  images: z.array(z.string()),
})


const handleDelete = (id: number) => {
    deleteProducts(id); 
    toast('Product deleted',{ icon: '👏', style: { borderRadius: '10px', background: '#333', color: '#fff',},});
};




function EditProductDialog({ product, onSave }: { product: any, onSave: (p: any) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    category: product.category,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onSave({ ...product, ...formData })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
        >
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




function AddProductDialog({ onSave , children}: { onSave: (p: any) => void ;children: React.ReactNode; }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    images: [] as File[],
  })

  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, images: files }))
      setPreviewUrls(files.map((file) => URL.createObjectURL(file)))
    }
  }

  const handleSubmit = () => {
    const productToSave = {
      ...formData,
      id: Number(formData.id),
      price: Number(formData.price),
    }
    onSave(productToSave)
    setOpen(false)
    setFormData({
      id: "",
      title: "",
      brand: "",
      description: "",
      price: "",
      category: "",
      images: [],
    })
    setPreviewUrls([])
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Fill in the product details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">ID</Label>
            <Input id="id" name="id" type="number" value={formData.id} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">Brand</Label>
            <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">Images</Label>
            <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleImageChange} className="col-span-3" />
          </div>
          {previewUrls.length > 0 && (
            <div className="col-span-4 flex flex-wrap gap-2">
              {previewUrls.map((url, index) => (
                <img key={index} src={url} alt="preview" className="h-20 w-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




export function ViewProductDialog({
  productId,
  children,
}: {
  productId: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

React.useEffect(() => {
  if (!open) return;

  (async () => {
    setLoading(true);
    const res = await getOneProduct(productId);
    console.log("Product updated:", res);
    setProduct(res);
    setLoading(false);
  })();
}, [open, productId]);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-none w-screen h-screen md:w-[85vw] lg:h-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div className="">

            <div className="flex gap-2 p-3">

            <div className="md:w-[50%] w-full my-5">
              <Carousel>
                <CarouselContent>
                  {product.images.map((item:any , index:any) => <CarouselItem key={index}><img src={item} /></CarouselItem>)}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="md:w-[50% w-full] gap-y-2 flex flex-col">
              <h2 className="font-bold text-xl md:text-3xl py-4 text-[#262626] dark:text-[#FAFAFA]">{product.title}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Brand : {product.brand}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Price : ${product.price}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Category : {product.category}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">DiscountPercentage : {product.discountPercentage}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Rating : {product.rating}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Stock : {product.stock}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Tags : {product.tags.map((item:any) => item )}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Weight : {product.weight}</h2>
              {<div>
                <span  className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Dimensions:</span>
                <div className="pl-4">
                  {Object.entries(product.dimensions ?? {}).map(([key, value]) => (
                    <div key={key}>
                      {key} : {String(value ?? "")} cm
                    </div>
                  ))}
                </div>
              </div>}
            </div>

            </div>

            <div>
                {product.description && (
                <div  className="text-[#262626] dark:text-[#FAFAFA] p-6">
                  <strong>Description:</strong> {product.description}
                </div>
              )}
            </div>

          </div>
        ) : (
          <p>No product found.</p>
        )}

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


const columns: ColumnDef<z.infer<typeof schema>>[] = [

  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="w-10 text-center">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.id}
      </Badge>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-15 h-15">
         <img src={row.original.images[0]} alt={row.original.title.split(" ").slice(0, 2).join(" ")+"..."} className="w-full h-full"/>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="w-32 cursor-pointer">


        <ViewProductDialog productId={row.original.id} >
          <span className="w-32 cursor-pointer hover:underline">
            {row.original.title.split(" ").slice(0, 2).join(" ") + "..."}
          </span>
        </ViewProductDialog>

      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="w-32">
          ${row.original.price}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.category}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">

           <EditProductDialog
          product={row.original}
          onSave={(updatedProduct) => {
            updateProducts(updatedProduct.id, updatedProduct.title, updatedProduct.category, updatedProduct.price)
            toast.success("Product updated!")
          }}
        />
        
          <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </DropdownMenuItem>     
          </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]




function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}




export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {

  const [globalFilter, setGlobalFilter] = React.useState("")
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )



  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })



  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">

      <div className="flex items-center justify-between px-4 lg:px-6 ">


      <AddProductDialog
        onSave={() => {
          toast.success("Product Added!")
        }}
      >
        <Button variant="outline" size="sm">
          <IconPlus />
        </Button>
      </AddProductDialog>
            

          <div className="flex w-[50%] items-center border border-gray-600 rounded-lg px-2.5 bg-tranparent">
            <SearchIcon className="h-4 w-4 mr-2.5" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full border-0"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
      </div>



      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>



        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>


      </TabsContent>


    </Tabs>
  )
}


