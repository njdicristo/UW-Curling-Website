import { getServerSession } from "next-auth";

export default async function ServerActionPage() {
    const getName = async ()=>{
        "use server";
        const session=await getServerSession();
        return session?.user?.name||"Not signed in";
    }
}