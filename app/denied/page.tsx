import Link from "next/link"

export default function Denied() {
    return (
        <div>
        <p>You have been denied from accessing this page.</p>
        <Link href="/">Return to home page</Link>
        </div>
    )
    
}