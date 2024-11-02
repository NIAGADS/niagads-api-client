// TEMPLATE redirect endpoint

import { Alert } from "@/components/UI/Alert";
import { getJsonValueFromCache } from "@/utils/cache";

type props = { params: any };
export default async function Page({ params }: props) {
    const { queryId } = await params;
    const response = await getJsonValueFromCache(queryId, "VIEW");
    const originatingRequest = await getJsonValueFromCache(
        `${queryId}_request`,
        "VIEW"
    );
    const hasPagination = originatingRequest.hasOwnProperty('pagination')
    function jsonSyntaxHighlight(arg0: string): string | TrustedHTML {
        throw new Error("Function not implemented.");
    }

    return (
        <main>
            {response
                ? <Alert variant="danger" message="View not yet implemented"></Alert>
                : <Alert variant="warning" message="Original response not found">
                    <div>
                        <p>Cached query responses expire after one hour.</p>
                        <p>To regenerate this view, please re-run your original API request.</p>
                    </div>
                </Alert>
            }
            <Alert variant="default" message="Originating request  ">
                <pre className="json" dangerouslySetInnerHTML={{ __html: jsonSyntaxHighlight(JSON.stringify(originatingRequest, undefined, 4)) }}></pre>
            </Alert>
        </main>
    );
}

//
