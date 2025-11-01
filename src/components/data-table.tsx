"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
<<<<<<< HEAD
=======
  onRowClick?: (row: TData) => void
>>>>>>> 236d7ee031757fea219477643d2640a13a2aab55
}

export function DataTable<TData, TValue>({
  columns,
  data,
<<<<<<< HEAD
=======
  onRowClick,
>>>>>>> 236d7ee031757fea219477643d2640a13a2aab55
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
<<<<<<< HEAD
    <div className="overflow-hidden rounded-md border">
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
=======
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
>>>>>>> 236d7ee031757fea219477643d2640a13a2aab55
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
<<<<<<< HEAD
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
=======
                onClick={() => onRowClick?.(row.original)}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-sm p-4">
>>>>>>> 236d7ee031757fea219477643d2640a13a2aab55
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
<<<<<<< HEAD
              <TableCell colSpan={columns.length} className="h-24 text-center">
=======
              <TableCell colSpan={columns.length} className="h-20 text-center text-muted-foreground">
>>>>>>> 236d7ee031757fea219477643d2640a13a2aab55
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}