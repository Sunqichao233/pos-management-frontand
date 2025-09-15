"use client"
import { useState, useEffect } from "react"
import {
    SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown, ChevronDown, MoreHorizontal,
    SquareCode,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

export type Device = {
    id: string
    code: string
    location: string
    status: number
}

const data: Device[] = [
    {
        id: '1',
        code: "Harry's-1",
        location: "Harry's",
        status: 1
    },
    {
        id: '2',
        code: "Harry's-2",
        location: "Harry's",
        status: 1
    },
    {
        id: '3',
        code: "test",
        location: "test",
        status: 0
    },
    {
        id: '4',
        code: "panqilin",
        location: "test",
        status: 0
    },
]


export default function Page() {

    const columns: ColumnDef<Device>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "code",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Device code
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="flex items-center gap-2 ">
                <Badge variant="secondary" className="rounded-lg w-10 h-10 flex items-center justify-center">
                    <SquareCode className="" />
                </Badge>
                {row.getValue("code")}
            </div>,
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("location")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status")
                if (status === 1) {
                    return <div className="text-green-600">Paired</div>
                } else {
                    return <div className="text-red-600">Unpaired</div>
                }

            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const device = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { changeStatus(device.id, device.status === 1 ? 0 : 1) }}>{device.status === 1 ? "unpair" : "pair"}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { deleteDevice(device.id) }}>delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const [location, setLocation] = useState<string>("All")
    const [status, setStatus] = useState<number>(2)
    const [pageNum, setPageNum] = useState(10)
    const [searchTerm, setSearchTerm] = useState<string>("") // 搜索词状态
    const [deviceData, setDeviceData] = useState<Device[]>([]) // 数据状态
    const [createDeviceCode, setCreateDeviceCode] = useState<string>("")
    const [createDeviceLocation, setCreateDeviceLocation] = useState<string>("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    useEffect(() => {
        // 实际要去后端API请求
        setDeviceData(data) // 模拟异步请求数据
    }, [])

    useEffect(() => {
        table.getColumn("code")?.setFilterValue(searchTerm)
        if (location !== "All") {
            table.getColumn("location")?.setFilterValue(location)
        } else {
            table.getColumn("location")?.setFilterValue("")
        }
        table.setPageIndex(0)
    }, [deviceData, searchTerm, location])

    const cancleCreateDevice = () => {
        setCreateDeviceCode("")
        setCreateDeviceLocation("")
    }

    const createDevice = () => {
        if (createDeviceCode === "" || createDeviceLocation === "") {
            alert('please fill in the code and location');
            return
        }
        const newDevice = {
            id: (deviceData.length + 1).toString(),
            code: createDeviceCode,
            location: createDeviceLocation,
            status: 0,
        }
        setDeviceData([...deviceData, newDevice])
        table.setPageIndex(0)
        setCreateDeviceCode("")
        setCreateDeviceLocation("")
    }

    const changeStatus = (id: string, status: number) => {
        // 实际要去后端API请求
        const newDeviceData = deviceData.map((device) => {
            if (device.id === id) {
                return { ...device, status: status }
            }
            return device
        })
        setDeviceData(newDeviceData)
    }

    const deleteDevice = (id: string) => {
        // 实际要去后端API请求
        const newDeviceData = deviceData.filter((device) => device.id !== id)
        setDeviceData(newDeviceData)
    }

    const table = useReactTable({
        data: deviceData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    })



    return (

        <SidebarInset>
            <div className="flex min-w-0 flex-1 flex-col p-4 md:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Device codes</h1>
                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-600 text-white">Create</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create Menu</DialogTitle>
                                    <DialogDescription>
                                        create a new menu for your business
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="code-1">Device Code</Label>
                                        <Input id="code-1" name="code" defaultValue="" placeholder="Device Code"
                                            value={createDeviceCode}
                                            onChange={(e) => setCreateDeviceCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="location-1">Location</Label>
                                        <Input id="location-1" name="location" defaultValue="" placeholder="Harry's"
                                            value={createDeviceLocation}
                                            onChange={(e) => setCreateDeviceLocation(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={cancleCreateDevice}>Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={createDevice}>Create</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>
                {/* Info alert */}
                <Card className="mt-4 flex items-start gap-3 border-blue-200 bg-blue-100 p-4 text-sm  dark:border-blue-300 dark:bg-blue-950/30 dark:text-blue-100">
                    <AlertCircle className="mt-0.5 h-4 w-4 text-blue-800" />
                    <p>
                        Your access to Square for Restaurants on unlimited devices ends in 25 days. Add your credit card details to avoid losing access to those devices. {" "}
                        <a className="font-medium underline text-blue-800" href="#">Add credit card information</a>
                    </p>
                </Card>
                {/* Filters */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="relative w-[300px]">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-9"
                            placeholder="Search device code name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* 下拉框location */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <span className="text-gray-600">
                                    location &nbsp;
                                </span>
                                {location}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={location} onValueChange={setLocation}>
                                <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Harry's">Harry's</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="test">test</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* 下拉框Status */}
                    <DropdownMenu>
                        <Button variant="outline">
                            <span className="text-gray-600">
                                Status &nbsp;
                            </span>
                            ({status})
                        </Button>
                    </DropdownMenu>
                    <Button variant="secondary" className="ml-auto gap-2 text-muted-foreground hover:text-foreground">
                        <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-600">Customize</span>
                    </Button>
                </div>
                {/* Table */}
                <div className="mt-4 flex flex-1 flex-col overflow-hidden rounded-md">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
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
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
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
                    {/* Pagination */}
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <Button variant="outline" >
                            <span className="text-gray-600">
                                Results per page&nbsp;
                            </span>
                            {pageNum}
                        </Button>
                        <div className="flex space-x-2">
                            <Button
                                variant="secondary"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ArrowLeft />
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </SidebarInset>
    )
}