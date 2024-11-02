'use client'
import Table, { TableProps } from "@/components/Table/Table";
import { Alert } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";

interface WrapperProps {
    table: TableProps
    endpoint: string,
    parameters: any
}

export default function TableWrapper({ table, endpoint, parameters }:  WrapperProps) {
    if (table.options?.rowSelect) {
        table.options.rowSelect.onRowSelect = () => console.log("selected");
    }

    table.options && (table.options.disableColumnFilters = true);

    return (
        <main>
            
            {table.options?.rowSelect && <Button variant="secondary">Fetch Data</Button>}
            <Table
                id={table.id}
                data={table.data}
                columns={table.columns}
                options={table.options}
            />
        </main>
    )
}
