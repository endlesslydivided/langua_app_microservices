'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from './components/UserCard/UserCard'
import AuthorizedLayout from './layout'

export default function ProfilePage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Client"} />
        </section>
    )
}

ProfilePage.getLayout = (page:React.ReactNode) =>
{
    return(
        <AuthorizedLayout>
            {page}
        </AuthorizedLayout>
    )
}