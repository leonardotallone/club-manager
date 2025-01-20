import React, { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";

// Componente Copyright
function Copyright(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Validación con Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Dirección de correo electrónico inválida")
        .required("El campo es obligatorio"),
});




const PasswordRecoverForm: React.FC = () => {

    const handleSubmit = (values: { email: string; }) => {
        const user = { username: values.email };
        console.log(user);
        navigate("/");
    };

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (accessToken) {
    //         navigate("/home");
    //     }
    // }, [accessToken])

    return (
        <Box
            component={Paper}
            elevation={6}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: 4,
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width:  450,
                height: 600,
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Recuperación de Contraseña</Typography>

            <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form style={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Dirección de correo"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center" // Centers the buttons horizontally
                            alignItems="center" // Aligns them vertically
                        >
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button href="/" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>


            <Grid container alignItems="center" justifyContent={{ xs: "center", sm: "space-between", md: "space-between", lg: "space-between", }} spacing={{ xs: 3, sm: 20, md: 30, lg: 30 }} direction={{ xs: "column", sm: "row", md: "row", lg: "row", }}  >
                <Grid size={{ xs: 12, sm: "auto", md: "auto", lg: "auto" }} sx={{ textAlign: 'center' }}>
                    <Link href="/email-recover" variant="body2">
                        ¿Olvidaste el correo?
                    </Link>
                </Grid>
            </Grid>


            <Box mt={5}>
                <Copyright />
            </Box>
        </Box>
    );
};

export default PasswordRecoverForm;

