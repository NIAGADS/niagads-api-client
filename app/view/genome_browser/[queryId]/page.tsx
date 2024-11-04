// /view/table/[queryId]
import { getJsonValueFromCache } from "@/utils/cache";
import { Alert } from "@/components/UI/Alert";
import { jsonSyntaxHighlight } from "@/common/utils";
import { MemoIGVBrowser as GenomeBrowser } from "@/components/IGVBrowser/IGVBrowser";
import { FEATURE_SEARCH_ENDPOINT } from "@/components/IGVBrowser/data/_constants";
import { config } from "@/components/IGVBrowser/test/_tracks";

type props = { params: any };
export default async function Page({ params }: props) {
    /* const { queryId } = await params;
    const originatingRequest = await getJsonValueFromCache(
        `${queryId}_request`,
        "VIEW"
    ); */

    const originatingRequest = null;

    const browserConfig = true; // await getJsonValueFromCache(`${queryId}_IGV_browser_config`, "VIEW");

    return (
        <main>
            {browserConfig ? (
                <GenomeBrowser
                    tracks={config}
                    featureSearchUrl={FEATURE_SEARCH_ENDPOINT}
                    genome="hg38"></GenomeBrowser>
            ) : (
                <Alert variant="warning" message="Original response not found">
                    <div>
                        <p>Cached query responses expire after one hour.</p>
                        <p>
                            To regenerate this view, please re-run your original
                            API request.
                        </p>
                    </div>
                </Alert>
            )}
            {originatingRequest && (
                <Alert variant="default" message="Originating request  ">
                    <pre
                        className="json"
                        dangerouslySetInnerHTML={{
                            __html: jsonSyntaxHighlight(
                                JSON.stringify(originatingRequest, undefined, 4)
                            ),
                        }}></pre>
                </Alert>
            )}
        </main>
    );
}

//
