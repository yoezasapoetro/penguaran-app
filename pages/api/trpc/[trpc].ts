import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter } from "api/server/routers/_app"
import { createContext } from "api/server/context"

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    batching: {
        enabled: true
    },
    onError({ error }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
            console.error("Something went wrong", error)
        }
    }
})
