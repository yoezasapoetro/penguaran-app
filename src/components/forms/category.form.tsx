import * as React from "react"
import { z } from "zod"
import { Button, ListItemContent, Option, Typography } from "@mui/joy"
import { Form, Formik, FormikConfig, FormikHelpers } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"

import { BottomDrawer, FormRadioGroup, FormSelect } from "components/ui"
import { Categories, Priorities } from "db/data"
import { CategoryFormData, CategoryFormProps } from "types/Category"
import { DataType } from "db/data/dataTypes"

const formSchema = toFormikValidationSchema(z.object({
    name: z.string({
        required_error: "Nama tidak boleh kosong."
    }),
    priority: z.number({
        required_error: "Prioritas tidak boleh kosong"
    })
        .min(0, "Level prioritas lebih dari 0")
        .max(3, "Level prioritas kurang atau sama dengan 3")
}).required({
    name: true,
    priority: true
}))

export default function CategoryForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: CategoryFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: CategoryFormData) => void
}) {
    const title: Record<string, string> = {
        edit: "Edit Kategori Pengeluaran",
        create: "Tambah Kategori Pengeluaran",
    }

    const formikConfig: FormikConfig<CategoryFormData> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            priority: formData.priority,
        },
        validationSchema: formSchema,
        onSubmit: (data: CategoryFormData, action: FormikHelpers<CategoryFormData>) => {
            submission({
                name: data.name,
                priority: data.priority,
            })
            action.setSubmitting(false)
            action.resetForm()
        },
    }

    const handleOnClose = (props: FormikHelpers<CategoryFormData>) => {
        props.resetForm()
        onClose()
    }

    return (
        <Formik
            {...formikConfig}
        >
            {(props) => (
                <BottomDrawer
                    open={isOpen}
                    onClose={() => handleOnClose(props)}
                    backdropClick
                >
                    <Typography
                        fontSize="lg"
                        width="100%"
                        textAlign="center"
                    >
                        {formMode && title[formMode]}
                    </Typography>

                    <Form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            rowGap: "1rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        <FormSelect<DataType>
                            name="name"
                            label="Nama"
                            placeholder="Nama kategori pengeluaran anda."
                            options={Categories}
                            renderOption={(option: DataType) => (
                                <React.Fragment key={option.label}>
                                    <Option value={option.label}>
                                        <ListItemContent sx={{ fontSize: "sm" }}>
                                            {option.label}
                                            <Typography>
                                                {option.group}
                                            </Typography>
                                        </ListItemContent>
                                    </Option>
                                </React.Fragment>
                            )}
                        />
                        <FormRadioGroup
                            hasIconDecorator
                            name="priority"
                            label="Skala Prioritas"
                            placeholder="Skala prioritas kategori pengeluaran."
                            defaultValue={1}
                            options={Priorities}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                borderRadius: 0,
                                fontWeight: 400,
                                fontSize: "md",
                                bgcolor: "primary.900",
                                color: "success.300",
                            }}
                        >
                            Simpan
                        </Button>
                    </Form>
                </BottomDrawer>
            )}
        </Formik>
    )
}

