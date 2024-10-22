import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth){
        console.log(request.nextUrl.pathname)
        console.log(request.nextauth.token)

        if(request.nextUrl.pathname.startsWith("/dashboard") 
            && request.nextauth.token?.role !=="admin"){
                return NextResponse.rewrite(
                    new URL("/denied", request.url)
                )
            }
    },
    {
        callbacks: {
            authorized: ( { token } ) => !!token
        },
    }
)
//Applies NextAuth only to the routes added here.
//In this case I am only adding memberdashboard
//because the rest of the site will be public.
