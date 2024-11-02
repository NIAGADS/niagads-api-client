// TEMPLATE /data/view route

import { NextRequest } from 'next/server'
import { backendFetch } from '@/utils/backend'

export async function GET(request: NextRequest) {
    const response = await backendFetch(request)
    return Response.json(response)
} 

