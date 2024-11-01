// /view/table/[queryId]
import { getJsonValueFromCache } from "@/utils/cache";
import TableWrapper from './TableWrapper'
import { Alert } from "@/components/UI/Alert";

type props = { params: any };
export default async function Page({ params }: props) {
    const { queryId } = await params;
    const response = await getJsonValueFromCache(queryId, "VIEW");
    const originatingRequest = await getJsonValueFromCache(
        `${queryId}_request`,
        "VIEW"
    );
    console.log(originatingRequest)
    return (
        <main>
            <Alert variant="info" message="Server-side pagination not yet implemented.">
                <div>
                    <p>Displaying page XX out of XXX.</p>
                    <p>To fetch paged data, increment the value of the <span className="font-medium text-red-600">page</span> parameter in your request.</p>
                </div>
            </Alert>
            {response ?
                <TableWrapper
                    id={response.id}
                    data={response.data}
                    columns={response.columns}
                    options={response.options}
                    endpoint={originatingRequest.endpoint}
                    parameters={originatingRequest.parameters}
                />
                :
                <Alert variant="warning" message="Original response not found">
                    <div>
                        <p>Cached query responses expire after one hour.</p>
                        <p>To regenerate this view, please re-run your original API request.</p>
                    </div>
                </Alert>
            }</main>
    );
}

//
