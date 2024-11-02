// /data/view/table/[queryId]

import { getJsonValueFromCache } from '@/utils/cache';
import { NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
    console.log('got here')
    const queryId = new URL(request.url).pathname.split('/').slice(-1)[0]
    const response = await getJsonValueFromCache(queryId, "VIEW");

    return Response.json(Object.assign(response, {
        'warning': {
            'error': 'Invalid request',
            'msg': 'interactive views can only be rendered in a web browser; returning view data'
        }
    }))

}

