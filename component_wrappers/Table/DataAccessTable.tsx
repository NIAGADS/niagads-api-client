'use client'
import { useEffect, useState } from "react";
import { RowSelectionState } from "@tanstack/react-table"
import Table, { TableProps } from "@/components/Table/Table";
import { Button } from "@/components/UI/Button";
import { TableWrapperProps } from "./types";

export default function DataAccessTable({ table, endpoint, parameters }:  TableWrapperProps) {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
    const [disableRowSelectAction, setDisableRowSelectAction] = useState<boolean>(false)

    // ideally, you shouldn't end up here unless the table has rowSelect options
    // which is why I'm assuming options.rowSelect is not null
    const handleRowSelect =  (rows: RowSelectionState) => setSelectedRows(rows)
    Object.assign(table.options!.rowSelect!, {onRowSelect: handleRowSelect})

    useEffect(() => {
        if (Object.keys(selectedRows!).length === 0) {
            console.log(Object.keys(selectedRows!).length)
            setDisableRowSelectAction(true)
        }
        else {
            setDisableRowSelectAction(false)
        }
    }, [selectedRows])

    return (
        <main>
            <Button variant="primary" disabled={disableRowSelectAction}>View Selected Track Data in Query Region</Button>
            <Table
                id={table.id}
                data={table.data}
                columns={table.columns}
                options={table.options}
            />
        </main>
    )
}
