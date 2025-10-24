import React, { useEffect, useContext } from 'react';
import {
    Container,
    Paper,

    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Formik, Form } from "formik";
import dayjs, { Dayjs } from "dayjs";

import { joinUpContext } from "../../Context/JoinUpContext";
import { getAllUsersContext } from "../../Context/GetAllUsersContext";
import { signUpContext } from '../../Context/SignUpContext';

interface SignUpFormValues {
    name: string;
    lastName: string;
    address: string;
    birthDate: Dayjs;
    dni: string;
    contactNumber: string;
    gender: string;
    disciplines: object;
    category: string;
    full: boolean;
    avatarURL: string;
    email: string;
    admin: boolean;
    blockade: boolean;
    familyGroup: object;
}

interface SignUpFormProps {
    user?: any;
    onClose?: () => void; // ✅ nueva prop opcional
    mode?: "applicationsList" | "rejectedApplicationsList";
}

const SignUpForm: React.FC<SignUpFormProps> = ({ user, onClose, mode }) => {

    const { setJoinUpUser } = useContext(joinUpContext);
    const { setSignUpUser, setIdForDeleteApplication, setRejectApplication, setAcceptApplication } = useContext(signUpContext);
    const { loguedUserInformation } = useContext(getAllUsersContext);

    const genders = ["Masculino", "Femenino", "Otro"];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (user) setIdForDeleteApplication(user.id);
    }, [user, setIdForDeleteApplication]);

    const handleSubmit = (values: SignUpFormValues) => {
        const newUser = {
            ...values,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            avatarURL: "",
            admin: false,
            disciplines: [],
            blockade: false,
            admition: "admited",
            familyGroup: [],
            applicationDate: user.applicationDate,
        };
        setSignUpUser(newUser);
    };

    return (
        <Container maxWidth="md" >
            <Paper
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    width: { xs: "90%", sm: "80%", md: "60%" },
                    maxHeight: { xs: '100vh', md: 'auto' },
                    overflowY: { xs: 'auto', md: 'visible' },
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: { xs: 3, md: 4 },
                        color: '#424242',
                        textAlign: "center"
                    }}
                >
                    Datos del Solicitante
                </Typography>

                <Formik<SignUpFormValues>
                    enableReinitialize
                    initialValues={{
                        name: user?.name || "",
                        lastName: user?.lastName || "",
                        address: user?.address || "",
                        birthDate: user?.birthDate ? dayjs(new Date(user.birthDate.seconds * 1000)) : null,
                        gender: user?.gender || "",
                        disciplines: user?.disciplines || [],
                        dni: user?.dni || "",
                        contactNumber: user?.contactNumber || "",
                        avatarURL: user?.avatarURL || "",
                        email: user?.email || "",
                        admin: user?.admin || false,
                        blockade: user?.blockade || false,
                        category: user?.category || "",
                        full: user?.full || false,
                        familyGroup: user?.familyGroup || [],
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched }) => (
                        <Form>
                            {/* Campos */}
                            <Grid spacing={2} container>
                                {/* Columna 1 */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="name"
                                        label="Nombre"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name ? errors.name : " "}
                                        sx={{
                                            "& label.Mui-focused": { color: "green" },
                                            '& .MuiInput-underline:after': { borderBottomColor: 'green' },
                                        }}
                                    />
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="address"
                                        label="Domicilio"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address ? errors.address : " "}
                                        sx={{
                                            "& label.Mui-focused": { color: "green" },
                                            '& .MuiInput-underline:after': { borderBottomColor: 'green' },
                                        }}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                label="Fecha de Nacimiento"
                                                value={values.birthDate}
                                                onChange={(newValue) =>
                                                    handleChange({ target: { name: "birthDate", value: newValue } })
                                                }
                                                slotProps={{
                                                    textField: {
                                                        variant: 'standard',
                                                        onBlur: () => handleBlur({ target: { name: 'birthDate' } }),

                                                        sx: {
                                                            width: '100%',
                                                            overflow: 'hidden', // <-- Oculta scroll
                                                            "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                                                            scrollbarWidth: "none", // Firefox
                                                            paddingRight: '4px',
                                                            "& label.Mui-focused": {
                                                                color: "green",  // color verde solo cuando está enfocado
                                                            },
                                                            '& .MuiInput-underline:after': {
                                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>

                                {/* Columna 2 */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="lastName"
                                        label="Apellido/s"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
                                        sx={{
                                            "& label.Mui-focused": { color: "green" },
                                            '& .MuiInput-underline:after': { borderBottomColor: 'green' },
                                        }}
                                    />
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="contactNumber"
                                        label="Número de Contacto"
                                        value={values.contactNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.contactNumber && Boolean(errors.contactNumber)}
                                        helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : " "}
                                        sx={{
                                            "& label.Mui-focused": { color: "green" },
                                            '& .MuiInput-underline:after': { borderBottomColor: 'green' },
                                        }}
                                    />
                                    <FormControl
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            mt: 1, // ✅ ajusta este valor (1–1.5 suele ser perfecto)
                                            "& label.Mui-focused": { color: "green" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                        }}
                                    >
                                        <InputLabel id="gender-label">Género</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            id="gender"
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {genders.map((g) => (
                                                <MenuItem key={g} value={g}>
                                                    {g}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Columna 3 */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="dni"
                                        label="DNI"
                                        value={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dni && Boolean(errors.dni)}
                                        helperText={touched.dni && errors.dni ? errors.dni : " "}
                                        sx={{
                                            "& label.Mui-focused": { color: "green" },
                                            '& .MuiInput-underline:after': { borderBottomColor: 'green' },
                                        }}
                                    />
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="email"
                                        label="Correo electrónico"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email ? errors.email : " "}
                                        sx={{
                                            "& label.Mui-focused": { color: "green" },
                                            '& .MuiInput-underline:after': { borderBottomColor: 'green' },
                                        }}
                                    />
                                </Grid>
                            </Grid>



                            {/* Botones */}
                            <Grid container spacing={2} sx={{ mt: { xs: 3, md: 4 } }}>
                                {mode === "applicationsList" ? (
                                    <>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Button
                                                onClick={onClose}
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    backgroundColor: 'grey',
                                                    '&:hover': { backgroundColor: 'darkgrey' },
                                                }}
                                            >
                                                CANCELAR
                                            </Button>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Grid container spacing={1}>
                                                <Grid size={{ xs: 6 }}>
                                                    <Button
                                                        type="submit"
                                                        onClick={() => setRejectApplication(true)}
                                                        variant="contained"
                                                        fullWidth
                                                        sx={{
                                                            mt: 1,
                                                            backgroundColor: '#b71c1c',
                                                            '&:hover': { backgroundColor: 'darkred' },
                                                        }}
                                                    >
                                                        RECHAZAR
                                                    </Button>
                                                </Grid>
                                                <Grid size={{ xs: 6 }}>
                                                    <Button
                                                        type="submit"
                                                        onClick={() => setAcceptApplication(true)}
                                                        variant="contained"
                                                        fullWidth
                                                        sx={{
                                                            mt: 1,
                                                            backgroundColor: '#2e7d32',
                                                            '&:hover': { backgroundColor: '#1b5e20' },
                                                        }}
                                                    >
                                                        ACEPTAR
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            onClick={onClose}
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 1,
                                                backgroundColor: 'grey',
                                                '&:hover': { backgroundColor: 'darkgrey' },
                                            }}
                                        >
                                            CERRAR
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default SignUpForm;
