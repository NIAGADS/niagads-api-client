// /filer
import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/utils/backend'

export async function GET(request: NextRequest) {
    const requestUrl = process.env.API_PUBLIC_URL;
    const response = await backendFetch(request)
    if (response.hasOwnProperty('redirect')) {
        const redirectEndpoint = `${response['redirect']}/${response['queryId']}`
        const redirectUrl = new URL(redirectEndpoint, requestUrl)
        return NextResponse.redirect(redirectUrl)
    }

    return Response.json(response)
} 
