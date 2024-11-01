'use client'
import Table, {TableProps}  from "@/components/Table/Table";
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
            <Alert variant="info" message="Server-side pagination not yet implemented.">
                <div>
                    <p>Displaying page XX out of XXX.</p>
                    <p>To fetch paged data, increment the value of the <span className="font-medium text-red-600">page</span> parameter in your request.</p>
                </div>
            </Alert>
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
