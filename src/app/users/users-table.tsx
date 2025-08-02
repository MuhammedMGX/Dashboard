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
import { deleteProducts, getOneProduct, getOneUsers, updateProducts } from "../_api/fetch"

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
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: z.object({
    color: z.string(),
    type: z.string(),
  }),
  ip: z.string(),
  address: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    stateCode: z.string(),
    postalCode: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    country: z.string(),
  }),
  macAddress: z.string(),
  university: z.string(),
  bank: z.object({
    cardExpire: z.string(),
    cardNumber: z.string(),
    cardType: z.string(),
    currency: z.string(),
    iban: z.string(),
  }),
  company: z.object({
    department: z.string(),
    name: z.string(),
    title: z.string(),
    address: z.object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      stateCode: z.string(),
      postalCode: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      country: z.string(),
    }),
  }),
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  crypto: z.object({
    coin: z.string(),
    wallet: z.string(),
    network: z.string(),
  }),
  role: z.string(),
});



const handleDelete = () => {
    toast('User deleted',{ style: { borderRadius: '10px', background: '#d10000', color: '#fff', border: 'none'},});
};






export function ViewUserDialog({
  userId,
  children,
}: {
  userId: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

React.useEffect(() => {
  if (!open) return;

  (async () => {
    setLoading(true);
    const res = await getOneUsers(userId);
    console.log("Product updated:", res);
    setUser(res);
    setLoading(false);
  })();
}, [open, userId]);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-none w-screen h-screen md:w-[50vw] lg:h-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p>Loading...</p>
        ) : user ? (

            <div className="flex flex-col gap-2 p-3">

            <div className="flex w-full items-cenetr">
                  <img src={user.image} className="w-15 h-15" />
                  <h2 className="font-semibold text-xl md:text-2xl ps-4 my-auto text-[#262626] dark:text-[#FAFAFA] flex">{user.username} <p className="font-medium text-base md:text-base ps-2 mt-auto text-[#6e6e6e] dark:text-[#b3b3b3]">{user.role}</p></h2>
            </div>

            <div className="gap-y-2 flex flex-col pt-5">
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Name : {user.firstName} {user.maidenName} {user.lastName}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">email : {user.email}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">phone : {user.phone}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">age : {user.age}</h2>
              <h2 className="font-semibold text-[#262626] dark:text-[#FAFAFA]">gender : {user.gender}</h2>

              {<div>
                <span  className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Address:</span>
                <div className="pl-4">
                  {Object.entries(user.address ?? {}).map(([key, value]) => (
                    <div key={key}>
                      {key} : {String(value ?? "")}
                    </div>
                  ))}
                </div>
              </div>}

              {<div>
                <span  className="font-semibold text-[#262626] dark:text-[#FAFAFA]">Bank:</span>
                <div className="pl-4">
                  {Object.entries(user.bank ?? {}).map(([key, value]) => (
                    <div key={key}>
                      {key} : {String(value ?? "")}
                    </div>
                  ))}
                </div>
              </div>}
              


            </div>

          </div>
        ) : (
          <p>No user found.</p>
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
      <div className="w-10 h-10">
         <img src={row.original.image} alt={row.original.username.split(" ").slice(0, 2).join(" ")+"..."} className="w-full h-full"/>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className=" cursor-pointer">


        <ViewUserDialog userId={row.original.id} >
          <span className="w-32 cursor-pointer hover:underline">
            {row.original.username}
          </span>
        </ViewUserDialog>

      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.phone}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.address.country}
      </div>
    ),
  },
    {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="">
          {row.original.role}
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

            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDelete()}
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




export function UserTable({
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


