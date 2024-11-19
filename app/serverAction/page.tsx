import { getServerSession } from "next-auth";

export default async function ServerActionPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getName = async ()=>{
        "use server";
        const session=await getServerSession();
        return session?.user?.name||"Not signed in";
    }
}