import { getJsonValueFromCache } from "@/utils/cache"

type props = { params: any };
export default async function Page({ params }: props) {
    const table = await getJsonValueFromCache(params.queryId, 'VIEW')

    return (
        table ? <main>
            {table.id}
        </main> : <div>Response has expired</div>
    );
}

//<Table id={table.id} data={table.data} columns={table.columns} options={table.options} />