"use client"

import {useState} from "react";
import Card from "@mui/material/Card";
import {Box, Button, CardContent, Input, Typography, CircularProgress} from "@mui/material";
import {Control, Controller, FieldErrors, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";

// Form validation schema
const clientSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255, "Name is too long"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().optional(),
    address: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

// Input field component to reduce repetition
const FormField = ({
                       name,
                       control,
                       placeholder,
                       errors
                   }: {
    name: keyof ClientFormData,
    control: Control<ClientFormData>,
    placeholder: string,
    errors: FieldErrors<ClientFormData>
}) => (
    <Controller
        control={control}
        name={name}
        render={({field}) => (
            <Box display="flex" flexDirection="column" sx={{mr: 2, mb: 2}}>
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={field.value || ''}
                    error={!!errors[name]}
                    onChange={field.onChange}
                />
                {errors[name] && (
                    <Typography color="error" sx={{fontSize: 10}}>
                        {errors[name].message}
                    </Typography>
                )}
            </Box>
        )}
    />
);

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {control, handleSubmit, setError, formState: {errors}} = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },
    });

    const onSubmit = async (data: ClientFormData) => {
        setIsSubmitting(true);
        setSubmitSuccess(false);

        try {
            const response = await axios.post('http://next-tuto.test/clients', data);
            console.log(response);
            setSubmitSuccess(true);
            // You could add navigation or a success message here
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
        } catch (error: never) {
            if (error.response?.status === 422) {
                const serverErrors = error.response.data.errors;

                Object.keys(serverErrors).forEach((field) => {
                    setError(field as keyof ClientFormData, {
                        type: 'manual',
                        message: serverErrors[field][0]
                    });
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card sx={{minWidth: '90%'}}>
            <CardContent>
                <Box display="flex" sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <h1>New client</h1>
                    {submitSuccess && (
                        <Typography color="success.main">Client successfully created!</Typography>
                    )}
                </Box>

                <Box sx={{mt: 3, p: 2}}>
                    <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                        <Box display="flex" flexWrap="wrap" sx={{mb: 3}}>
                            <FormField name="name" control={control} placeholder="Name" errors={errors}/>
                            <FormField name="email" control={control} placeholder="Email" errors={errors}/>
                            <FormField name="phone" control={control} placeholder="Phone" errors={errors}/>
                            <FormField name="address" control={control} placeholder="Address" errors={errors}/>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit"/> : null}
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Page;