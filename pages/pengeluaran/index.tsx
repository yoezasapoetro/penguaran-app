import { useState } from "react"
import {
    Tabs,
    Tab,
    TabList,
    Box,
    tabClasses,
    Typography,
    IconButton,
    colors,
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
                textColor="primary.900"
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
                bottom: "4.5rem",
                right: "1rem",
                zIndex: 3,
            }}
        >
            <IconButton
                onClick={props.onClick}
                size="lg"
                sx={{
                    backgroundColor: "primary.900",
                    borderRadius: "100px",
                    boxShadow: "xl",
                }}
                variant="solid"
            >
                <AddIcon size={30} color={colors.green[300]} />
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
            marginTop="3rem"
            width="100%"
            maxWidth="sm"
            position="relative"
        >
            <Typography
                fontSize="lg"
                fontWeight="md"
                textColor={colors.blue[900]}
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
                        [`& .${tabClasses.root}`]: {
                            boxShadow: "none",
                            color: colors.blue[900],
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
                                bgcolor: colors.green[300],
                            },
                            [`&.${tabClasses.selected}`]: {
                                color: colors.green[300],
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
            <PageContainer
                paddingTop={3}
            >
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
