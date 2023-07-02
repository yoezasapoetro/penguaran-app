import { useState } from "react"
import {
    Tabs,
    Tab,
    TabList,
    Box,
    tabClasses,
    Typography,
    IconButton,
} from "@mui/joy"
import { Formik, FormikConfig } from "formik"


import {
    IoAdd as AddIcon
} from "react-icons/io5"

import {
    PageTitle,
    PageContainer,
    BottomDrawer,
} from "@/components/ui"
import colors from "@/components/colors"
import { Pengeluaran } from "@/types/Pengeluaran"

function PengeluaranForm(props: {
    open: boolean
    onClose: () => void
}) {
    const formikConfig: FormikConfig<Pengeluaran> = {
        initialValues: {
        }
    }

    return (
        <BottomDrawer
            open={props.open}
            onClose={props.onClose}
            height={100}
        >
            <Typography
                fontSize="lg"
                gutterBottom
                width="100%"
                textAlign="center"
                textColor={colors.neutral}
            >
                Pengeluaran Form
            </Typography>
            <Formik
                {...formikConfig}
            >

            </Formik>
        </BottomDrawer>
    )
}

function FabButton(props: {
    onClick: () => void
}) {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "5.5rem",
                right: "1.5rem",
                zIndex: 3,
            }}
        >
            <IconButton
                onClick={props.onClick}
                size="lg"
                sx={{
                    backgroundColor: colors.primary,
                    borderRadius: "100px",
                    boxShadow: "md",
                }}
                variant="solid"
            >
                <AddIcon size={30} color={colors.neutral} />
            </IconButton>
        </Box>
    )
}

function TimelineTabs(props: {
}) {
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const [activeTab, setActiveTab] = useState<string | null>(null)

    return (
        <Box
            marginTop="3.5rem"
            width="100%"
            maxWidth="sm"
            position="relative"
        >
            <Typography
                fontSize="lg"
                fontWeight="md"
                textColor={colors.neutral}
            >
                Timeline Pengeluaran
            </Typography>
            <Tabs
                aria-label="timelineTabs"
                value={activeTab}
                onChange={(_, value: number | string | null) => setActiveTab(value as string)}
                selectionFollowsFocus
                slotProps={{
                    root: {
                        style: {
                            width: "100%",
                            marginRight: "-1rem",
                        }
                    }
                }}
            >
                <TabList
                    variant="plain"
                    slotProps={{
                        root: {
                            style: {
                                overflowY: "scroll",
                                scrollBehavior: "smooth",
                                backgroundColor: colors.background,
                            }
                        }
                    }}
                    sx={{
                        "--List-padding": "0px",
                        "--List-radius": "0px",
                        "--ListItem-minHeight": "2.5rem",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        ['&::-webkit-scrollbar']: {
                            display: "none",
                        },
                        backgroundColor: colors.background,
                        [`& .${tabClasses.root}`]: {
                            boxShadow: "none",
                            backgroundColor: colors.background,
                            color: colors.secondary,
                            [`&.${tabClasses.selected}::before`]: {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                left: "var(--ListItem-paddingLeft)",
                                right: "var(--ListItem-paddingRight)",
                                bottom: 0,
                                height: 4,
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                bgcolor: colors.neutral,
                            }
                        }
                    }}
                >
                    {months.reverse().map((item, idx) =>
                        <Tab key={idx} value={item.toLowerCase()}>
                            {item}
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        </Box>
    )
}

export default function Pengeluaran() {
    const [formOpen, setFormOpen] = useState<boolean>(false)

    const addPengeluaranCallback = () => {
        setFormOpen(true)
    }

    const formCloseCallback = () => {
        setFormOpen(false)
    }

    return (
        <>
            <PageTitle title="Pengeluaran"></PageTitle>
            <PageContainer>
                <TimelineTabs
                />
                <PengeluaranForm
                    open={formOpen}
                    onClose={formCloseCallback}
                />
            </PageContainer >
            <FabButton
                onClick={addPengeluaranCallback}
            />
        </>
    )
}
