import * as React from "react"
import { Form, Formik, FormikConfig, FormikHelpers } from "formik"
import { z } from "zod"
import { Typography, Button } from "@mui/joy"

import { StoreFormData, StoreFormProps } from "types/Store"
import { Stores } from "db/data"
import { DataType } from "db/data/dataTypes"
import { BottomDrawer, FormInput, FormSelect, OptionListItem } from "components/ui"

const title: Record<string, string> = {
    edit: "Edit Penjual atau Entitas",
    create: "Tambah Penjual atau Entitas",
}

const formSchema = z.object({
    name: z.string({
        required_error: "Nama tidak boleh kosong."
    }),
    type: z.string({
        required_error: "Tipe tidak boleh kosong"
    })
}).required({
    name: true,
    type: true
})

export default function PenjualModalForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: StoreFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: StoreFormData) => void
}) {
    const formikConfig: FormikConfig<StoreFormData> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            type: formData.type,
            address: formData.address,
        },
        validationSchema: formSchema,
        onSubmit: (data: StoreFormData, action: FormikHelpers<StoreFormData>) => {
            submission({
                name: data.name,
                type: data.type,
                address: data.address,
            })
            action.setSubmitting(false)
            action.resetForm()
        },
    }

    return (
        <BottomDrawer
            open={isOpen}
            onClose={onClose}
            backdropClick
        >
            <Typography
                fontSize="lg"
                width="100%"
                textAlign="center"
            >
                {formMode && title[formMode]}
            </Typography>

            <Formik
                {...formikConfig}
            >
                {() => (
                    <Form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            rowGap: "1rem",
                            marginTop: "0.5rem",
                            flex: "1",
                        }}
                    >
                        <FormSelect
                            name="type"
                            label="Tipe"
                            placeholder="Tipe penjual & entitas anda."
                            options={Stores}
                            renderOption={(option: DataType) => {
                                return (
                                    <React.Fragment key={option.label}>
                                        <OptionListItem {...option} />
                                    </React.Fragment>
                                )
                            }}
                        />
                        <FormInput
                            name="name"
                            label="Nama"
                            placeholder="Nama penjual & entitas anda."
                        />
                        <FormInput
                            name="address"
                            label="Alamat"
                            placeholder="Alamat penjual & entitas anda."
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                borderRadius: 0,
                                fontWeight: 400,
                                fontSize: "md",
                                color: "success.300",
                                backgroundColor: "primary.900",
                            }}
                        >
                            Simpan
                        </Button>
                    </Form>
                )}
            </Formik>
        </BottomDrawer>
    )
}

