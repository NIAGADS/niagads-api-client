// TEMPLATE redirect endpoint

import { Alert } from "@/components/UI/Alert";
import { getJsonValueFromCache } from "@/utils/cache";

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
            <div></div>
        </main>
    ) : (
        <Alert variant="warning" message="Original response not found">
            <div>
                <p>Cached query responses expire after one hour.</p>
                <p>To regenerate this view, please re-run your original API request.</p>
            </div>
        </Alert>
    );
}

//
