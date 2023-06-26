import { Typography } from "@mui/joy"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

import { PageContainer } from "@/components/ui"
import { authOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: true
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default function Home() {
    const session = useSession()

    return (
        <PageContainer>
            <Typography
                level="h3"
            >
                Hi, {' '}
                {session?.data?.user?.name}
            </Typography>
        </PageContainer>
    )
}
