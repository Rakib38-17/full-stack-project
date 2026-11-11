import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'


export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session?.user;

    if(!user) {
        return NextResponse.redirect(new URL('/signup', request.url))
    }

}


export const config = {
  matcher: ['/add-destination','/my-bookings', '/destinations/:path*', '/profile' ],
}