import { getJsonValueFromCache } from "@/utils/cache";
import TableWrapper from './TableWrapper'

type props = { params: any };
export default async function Page({ params }: props) {
    const { queryId } = await params;
    const table = await getJsonValueFromCache(queryId, "VIEW");
    const originatingRequest = await getJsonValueFromCache(
        `${queryId}_request`,
        "VIEW"
    );
    console.log(originatingRequest)
    return table ? (
        <main>
            <TableWrapper
                id={table.id}
                data={table.data}
                columns={table.columns}
                options={table.options}
                endpoint = {originatingRequest.endpoint}
                parameters = {originatingRequest.parameters}
            />
        </main>
    ) : (
        <div>Response has expired</div>
    );
}

//
