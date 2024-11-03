"use client";
import { useEffect, useState, useRef } from "react";
import { RowSelectionState, selectRowsFn } from "@tanstack/react-table";
import Table, { TableProps } from "@/components/Table/Table";
import { Button } from "@/components/UI/Button";
import { TableWrapperProps } from "./types";
import { renderTooltip } from "@/components/UI";
import { useRouter } from "next/router";

export default function DataAccessTable({
    table,
    endpoint,
    parameters,
}: TableWrapperProps) {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [disableRowSelectAction, setDisableRowSelectAction] =
        useState<boolean>(true);
    //const router = useRouter()
    
    const getTrackDataUrl = `/filer/data?format=table&loc=${parameters.loc}&track=`

    const handleGetTrackData = () => {
        const requestUrl = getTrackDataUrl + Object.keys(selectedRows).join(',')
        window.open(requestUrl) // will open a new tab
        // router.push(requestUrl) // will open in same tab
    }

    const handleRowSelect = (rows: RowSelectionState) => setSelectedRows(rows);
    Object.assign(table.options!.rowSelect!, { onRowSelect: handleRowSelect });
    // ideally, you shouldn't end up here unless the table has rowSelect options
    // which is why I'm assuming options.rowSelect is not null

    useEffect(() => {
        if (Object.keys(selectedRows!).length === 0) {
            setDisableRowSelectAction(true);
        } else {
            setDisableRowSelectAction(false);
        }
    }, [selectedRows]);

    const renderRowSelectActionButton = (disabled: boolean) => {
        return (
            <Button variant="primary" disabled={disabled} onClick={handleGetTrackData}>
                <span>
                    Get <span className="underline">selected</span> track data
                    in the region {parameters.loc}
                </span>
            </Button>
        );
    };

    return (
        <main>
            {disableRowSelectAction == true
                ? renderTooltip(
                      renderRowSelectActionButton(disableRowSelectAction),
                      "Select tracks from the table below"
                  )
                : renderRowSelectActionButton(disableRowSelectAction)}
            <Table
                id={table.id}
                data={table.data}
                columns={table.columns}
                options={table.options}
            />
        </main>
    );
}
