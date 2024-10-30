import { getJsonValueFromCache } from "@/utils/cache"
import Table from "@/components/Table/Table";

type props = { params: any };
export default async function Page({ params }: props) {
    const table = await getJsonValueFromCache(params.queryId, 'VIEW')

    return (
        table ? <main>
            <Table id={table.id} data={table.data} columns={table.columns} options={table.options} />
        </main> : <div>Response has expired</div>
    );
}

//