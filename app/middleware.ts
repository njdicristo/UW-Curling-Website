export { default } from "next-auth/middleware"

//Applies NextAuth only to the routes added here.
//In this case I am only adding memberdashboard
//because the rest of the site will be public.
export const config = { matcher: ["/dashboard"] }