// TEMPLATE route

import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/utils/backend'
import { headers } from 'next/headers'
import { requestFromBrowser } from '@/utils/validation'


export async function GET(request: NextRequest) {
    const response = await backendFetch(request)

    if (response.hasOwnProperty('redirect')) {
        let redirectEndpoint = `${response['redirect']}/${response['queryId']}`

        const userAgent = (await headers()).get('User-Agent')
        const validUserAgent: boolean = requestFromBrowser(userAgent!)
        if (!validUserAgent) {
    
            redirectEndpoint = '/data' + redirectEndpoint
    
            // FIXME: redirecting from this api route to another is not working
            // may be fixed in @canary
            // temp fix; fetch
            const redirectUrl = new URL(redirectEndpoint, request.url)
            const response = await fetch(redirectUrl.toString())
            return response
        }

        const redirectUrl = new URL(redirectEndpoint, request.url)
        return NextResponse.redirect(redirectUrl)
    }

    return Response.json(response)
} 

