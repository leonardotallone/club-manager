import React, { useContext, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Modal } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { recoverPasswordContext } from '../Context/RecoverPasswordContext';
import { controlModalsContext } from '../Context/ControModalsContext';

// Validación con Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Correo electrónico inválido")
        .required("El campo es obligatorio"),
});

const PasswordRecoverForm: React.FC = () => {
    const { setEmail, recoverPasswordError, recoverPasswordSuccess, setRecoverPasswordError } = useContext(recoverPasswordContext);
    const { setOpenRecoverPassword, setOpenRecoverEmail } = useContext(controlModalsContext)

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (recoverPasswordSuccess) {
            setOpen(true);
        }
    }, [recoverPasswordSuccess]);

    const handleCloseModal = () => {
        setOpen(false);
        navigate("/");
    };

    const handleSubmit = (values: { email: string }) => {
        setEmail({ email: values.email });
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                width: { xs: "70%", sm: 400 },
                height: 365, // 🔹 igualamos la altura con SignInForm
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // centra internamente el contenido
            }}
        >
            <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: '#424242' }}
            >
                Recuperar Contraseña
            </Typography>

            <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched, isValid, dirty }) => (
                    <Form style={{ width: '100%' }}>
                        {/* EMAIL */}
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Correo electrónico"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={() => setRecoverPasswordError("")}
                            error={touched.email && Boolean(errors.email) || Boolean(recoverPasswordError)}
                            helperText={
                                touched.email && errors.email
                                    ? errors.email
                                    : recoverPasswordError
                                        ? recoverPasswordError
                                        : " "
                            }
                            sx={{
                                mb: 3,
                                "& label.Mui-focused": { color: "green" },
                                "& .MuiInput-underline:after": { borderBottomColor: "green" },
                            }}
                        />

                        <Grid container spacing={1.5}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => setOpenRecoverPassword(false)}
                                    sx={{
                                        backgroundColor: "grey",
                                        '&:hover': { backgroundColor: "darkred" },
                                        textTransform: "none",
                                        height: 32,
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={!isValid || !dirty}
                                    sx={{
                                        backgroundColor: "#b71c1c",
                                        '&:hover': { backgroundColor: "darkred" },
                                        textTransform: "none",
                                        height: 32,
                                    }}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            type="button"
                            onClick={() => {
                                setOpenRecoverEmail(true);
                                setOpenRecoverPassword(false);
                            }}
                            sx={{
                                mt: 1.5,
                                textTransform: "none",
                                color: "#b71c1c",
                                fontSize: 13,
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                        >
                            ¿Olvidaste el correo?
                        </Button>
                    </Form>
                )}
            </Formik>

            {/* MODAL DE ÉXITO */}
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        maxWidth: 300,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'rgba(29, 29, 29, 0.75)',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        id="child-modal-title"
                        sx={{ fontSize: 17, color: "white", fontWeight: 700, mb: 1 }}
                    >
                        Solicitud Enviada Exitosamente
                    </Typography>
                    <Typography
                        id="child-modal-description"
                        sx={{ fontSize: 13, color: "white", fontWeight: 400, mb: 2 }}
                    >
                        {recoverPasswordSuccess}
                    </Typography>
                    <Button
                        onClick={handleCloseModal}
                        sx={{
                            backgroundColor: 'transparent',
                            color: '#007aff',
                            textTransform: 'none',
                            fontSize: 17,
                            fontWeight: 400,
                        }}
                    >
                        Aceptar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default PasswordRecoverForm;
