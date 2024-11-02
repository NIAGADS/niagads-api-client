// /track/[track]/data

import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/utils/backend'
import { requestFromBrowser } from '@/validators/request'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    const response = await backendFetch(request)
    console.log(response)
    if (response.hasOwnProperty('redirect')) {
        const userAgent = (await headers()).get('User-Agent')
        const validUserAgent: boolean = requestFromBrowser(userAgent!)
        if (!validUserAgent) {
            // FIXME: raise an error instead
            return Response.json({
                error: 'Invalid parameter',
                msg: 'interactive data views can only be generated if request is made in a web-browser; set `format=JSON`'
            })
        }
        const redirectEndpoint = `${response['redirect']}/${response['queryId']}`
        const redirectUrl = new URL(redirectEndpoint, request.url)
        return NextResponse.redirect(redirectUrl)
    }

    return Response.json(response)
} 


/* TODO: ? - redirect user endpoint 

// ideally, just update the redirect endpoint
redirectEndpoint = '/data' + redirectEndpoint

// FIXME: ...but... redirecting from this api route to another is not working
// known bug; may be fixed in @canary
// temp fix; fetch
const redirectUrl = new URL(redirectEndpoint, request.url)
const response = await fetch(redirectUrl.toString())
return response

*/