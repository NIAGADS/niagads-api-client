'use client'
import Table, { TableProps } from "@/components/Table/Table";
import { Alert } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";

interface WrapperProps {
    endpoint: string,
    parameters: any
}

export default function TableWrapper({ id, data, columns, options, endpoint, parameters }: TableProps & WrapperProps) {
    if (options?.rowSelect) {
        options.rowSelect.onRowSelect = () => console.log("selected");
    }

    options && (options.disableColumnFilters = false);


    return (
        <main>

            <Button variant="secondary">Fetch Data</Button>
            <Table
                id={id}
                data={data}
                columns={columns}
                options={options}
            />
        </main>
    )
}
