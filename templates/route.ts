// TEMPLATE route

import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/utils/backend'
import { headers } from 'next/headers'
import { requestFromBrowser } from '@/validators/request'

export async function GET(request: NextRequest) {
    const response = await backendFetch(request)

    if (response.hasOwnProperty('redirect')) {
        let redirectEndpoint = `${response['redirect']}/${response['queryId']}`

        const userAgent = (await headers()).get('User-Agent')
        const validUserAgent: boolean = requestFromBrowser(userAgent!)
        if (!validUserAgent) {
            if (!validUserAgent) {
                return Response.json({
                    error: 'Invalid parameter',
                    msg: 'interactive data views can only be generated if request is made in a web-browser; set `format=JSON`'
                })
            }
        }

        const redirectUrl = new URL(redirectEndpoint, request.url)
        return NextResponse.redirect(redirectUrl)
    }

    return Response.json(response)
} 
