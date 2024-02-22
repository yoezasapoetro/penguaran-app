import * as React from "react"
import { PageHeader, PageLayout } from "components/ui"
import { GlobalStyles } from '@mui/joy'
import { Toaster } from "sonner"

import { ExpenseForm } from "forms/index"

export default function ExpensesEntry() {
    return (
        <>
            <GlobalStyles
                styles={(theme) => `
                    [data-sonner-toaster][data-theme] {
                        font-family: ${theme.vars.fontFamily.body};
                        fontsize: ${theme.fontSize.md};
                        --border-radius: ${theme.vars.radius.md};
                        --success-bg: ${theme.vars.palette.success.softBg};
                        --success-border: rgb(${theme.vars.palette.success.mainChannel} / 0.2);
                        --success-text: ${theme.vars.palette.success.softColor};
                    }
                `}
            />
            <PageHeader
                title="Pengeluaran"
                subtitle="Entri pengeluaran"
                backUrl="/pengeluaran"
            />
            <PageLayout>
                <Toaster position="top-center" richColors />
                <ExpenseForm />
            </PageLayout>
        </>
    )
}
