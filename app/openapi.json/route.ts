import { NextRequest } from 'next/server'
import { backendFetch } from '@/utils/backend'

export async function GET(request: NextRequest) {
    const response = await backendFetch(request)
    console.log(response)
    return Response.json(response)
}