import { z } from "zod"
import { Form, Formik, FormikConfig, FormikHelpers } from "formik"
import { Button, Typography } from "@mui/joy"

import { SourcePaymentFormProps, SourcePaymentFormData } from "types/SourcePayment"
import { SourcePayments } from "db/data"
import { BottomDrawer, FormInput, FormRadioGroup } from "components/ui"

const title: Record<string, string> = {
    edit: "Edit Sumber Dana",
    create: "Tambah Sumber Dana",
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

export default function SourcePaymentForm({
    formMode,
    formData,
    isOpen,
    onClose,
    submission,
}: SourcePaymentFormProps & {
    isOpen: boolean,
    onClose: () => void,
    submission: (formData: SourcePaymentFormData) => void
}) {
    const formikConfig: FormikConfig<SourcePaymentFormData> = {
        enableReinitialize: true,
        initialValues: {
            name: formData.name,
            type: formData.type,
        },
        validationSchema: formSchema,
        onSubmit: (data: SourcePaymentFormData, action: FormikHelpers<SourcePaymentFormData>) => {
            submission({
                name: data.name,
                type: data.type,
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
                textColor="primary.900"
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
                        <FormInput
                            name="name"
                            label="Nama"
                            placeholder="Nama sumber dana anda."
                        />
                        <FormRadioGroup
                            hasIconDecorator
                            name="type"
                            label="Tipe"
                            placeholder="Tipe sumber dana anda."
                            defaultValue="bank"
                            options={SourcePayments}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                borderRadius: 0,
                                color: "success.300",
                                fontWeight: 400,
                                backgroundColor: "primary.900",
                                fontSize: "md",
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


