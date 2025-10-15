import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Box, Typography, Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Grid from '@mui/material/Grid2';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { Formik, Form } from "formik";

import * as Yup from "yup";

import { useParams } from "react-router-dom";
import { getAllCategoriesContext } from "../Context/GetAllCategoriesContext"
import { joinUpContext } from "../Context/JoinUpContext"
import { controlModalsContext } from '../Context/ControModalsContext';

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

const JoinUpForm: React.FC = () => {

    const { categories } = useContext(getAllCategoriesContext)
    const { setJoinUpUser } = useContext(joinUpContext)
    const { setOpenJoinUp } = useContext(controlModalsContext)

    const genders = ["Masculino", "Femenino", "Otro"]

    const { type } = useParams();
    const navigate = useNavigate();

    // Validación con Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
            .required("El campo es requerido"),
        lastName: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
            .required("El campo es requerido"),
        birthDate: Yup.date()
            .nullable()
            .transform((value, originalValue) => {
                if (originalValue === null || originalValue === '') {
                    return null;
                }
                return value;
            })
            .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
            .required("El campo es requerido")
            .test(
                "is-18",
                "Debes tener al menos 18 años",
                function (value) {
                    if (!value) return false;
                    const today = new Date();
                    const birthDate = new Date(value);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    return age >= 18;
                }
            ),
        gender: Yup.string()
            .required("El campo es requerido"),
        dni: Yup.string()
            .matches(/^\d+$/, "El DNI debe contener solo números")
            .test(
                "longitud-dni",
                "El DNI debe tener entre 7 y 8 dígitos",
                (value) => value && value.length >= 7 && value.length <= 8
            )
            .required("El campo es requerido"),
        address: Yup.string()
            .min(5, "La dirección debe tener como mínimo 5 caracteres")
            .required("El campo es requerido"),
        contactNumber: Yup.string()
            .matches(/^\+?\d{7,15}$/, "Número de contacto inválido")
            .required("El campo es requerido"),
        email: Yup.string()
            .when([], {
                is: () => type === "grouphead" || type === "unique",
                then: (schema) =>
                    schema
                        .required("El email es requerido")
                        .email("Dirección de correo electrónico inválida"),
                otherwise: (schema) => schema.notRequired(),
            }),
    });

    const handleSubmit = (
        values: SignUpFormValues,
    ) => {

        const user = {
            name: values.name,
            lastName: values.lastName,
            address: values.address,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            dni: values.dni,
            contactNumber: values.contactNumber,
            gender: values.gender,
            email: values.email,

            avatarURL: "",
            admin: false,
            disciplines: [],
            category: categories.find((cat: { id: string; }) => cat.id === "Activo")?.id || null,
            full: false,
            blockade: false,
            familyGroup: [],

            applicationDate: new Date(),
        };

        console.log("USER", user)
        setJoinUpUser(user)
        navigate("/");
    };

    const capitalizeFirstLetter = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleCloseJoinUp = () => {
        setOpenJoinUp(false);
    };


    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Paper
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    p: 4,
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    width: { xs: "70%", md: "60%" },

                    maxHeight: { xs: '100vh', md: 'auto' },  // Limitar altura en xs
                    overflowY: { xs: 'auto', md: 'visible' }, // Scroll vertical sólo en xs
                }}
            >

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#424242' }}>
                    Datos del Socio
                </Typography>
                <Formik<SignUpFormValues>
                    initialValues={{
                        name: "",
                        lastName: "",
                        address: "",
                        birthDate: null,
                        gender: "",
                        dni: "",
                        contactNumber: "",
                        avatarURL: "",
                        email: "",
                        admin: false,
                        disciplines: [],
                        category: "",
                        full: false,
                        blockade: false,
                        familyGroup: [],
                    }}

                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, }) => (
                        <Form>
                            <Grid container columnSpacing={2} direction="row"  >

                                <Grid direction="column" size={{ xs: 12, md: 4 }}>
                                    {/* NAME */}
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="name"
                                        label="Nombre"
                                        type="name"
                                        id="name"
                                        autoComplete="name"
                                        value={values.name}
                                        onChange={(e) => {
                                            const capitalizedValue = capitalizeFirstLetter(e.target.value);
                                            handleChange({ target: { name: e.target.name, value: capitalizedValue } });
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name ? errors.name : " "} // 
                                        sx={{
                                            mb: 0,
                                            "& label.Mui-focused": {
                                                color: "green",  // color verde solo cuando está enfocado
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                            },
                                        }}
                                    />
                                    {/* ADDRESS */}
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="address"
                                        label="Domicilio"
                                        type="address"
                                        id="address"
                                        autoComplete="address"
                                        value={values.address}
                                        onChange={(e) => {
                                            const capitalizedValue = capitalizeFirstLetter(e.target.value);
                                            handleChange({ target: { name: e.target.name, value: capitalizedValue } });
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address ? errors.address : " "}
                                        sx={{
                                            mb: -1,
                                            "& label.Mui-focused": {
                                                color: "green",  // color verde solo cuando está enfocado
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                            },
                                        }}
                                    />
                                    {/* BIRTHDATE */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['DatePicker']}  >
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                label="Fecha de Nacimiento"
                                                value={values.birthDate} // This should now be a Dayjs object
                                                onChange={(newValue) => {
                                                    const safeValue = newValue && dayjs(newValue).isValid() ? newValue : null;
                                                    handleChange({ target: { name: "birthDate", value: safeValue } });
                                                }}
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
                                        {touched.birthDate && errors.birthDate ?
                                            <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                {errors.birthDate as string}
                                            </Typography> : <span> &nbsp; </span>
                                        }
                                    </LocalizationProvider>
                                </Grid>
                                <Grid direction="column" size={{ xs: 12, md: 4 }} sx={{ mt: 0 }}>
                                    {/* LASTNAME */}
                                    <TextField

                                        variant="standard"
                                        fullWidth
                                        name="lastName"
                                        label="Apellido/s"
                                        type="lastName"
                                        id="lastName"
                                        autoComplete="lastName"
                                        value={values.lastName}
                                        onChange={(e) => {
                                            const capitalizedValue = capitalizeFirstLetter(e.target.value);
                                            handleChange({ target: { name: e.target.name, value: capitalizedValue } });
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName ? errors.lastName : " "} // 
                                        sx={{
                                            mt: 0,
                                            "& label.Mui-focused": {
                                                color: "green",  // color verde solo cuando está enfocado
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                            },
                                        }}

                                    />

                                    {/* CONTACT NUMBER */}
                                    <TextField
                                        // margin="normal"
                                        variant="standard"
                                        fullWidth
                                        name="contactNumber"
                                        label="Número de Contacto"
                                        type="contactNumber"
                                        id="contactNumber"
                                        autoComplete="contactNumber"
                                        value={values.contactNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.contactNumber && Boolean(errors.contactNumber)}
                                        helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : " "}
                                        sx={{
                                            mt: 0,
                                            "& label.Mui-focused": {
                                                color: "green",  // color verde solo cuando está enfocado
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                            },
                                        }}
                                    />

                                    {/* GENDER */}
                                    <FormControl fullWidth variant="standard" sx={{
                                        "& label.Mui-focused": {
                                            color: "green",  // color verde solo cuando está enfocado
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: 'green', // color verde cuando está enfocado
                                        },
                                    }}>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            error={touched.gender && Boolean(errors.gender)}
                                        >Genero</InputLabel>
                                        <Select

                                            labelId="gender-label"
                                            id="gender"
                                            name="gender"
                                            value={values.gender}
                                            onChange={(event) => {
                                                handleChange({ target: { name: 'gender', value: event.target.value } }); // Correctly update Formik state
                                            }}
                                            onBlur={handleBlur}
                                            label="Género"
                                        >
                                            {genders?.length > 0 ? (
                                                genders.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <p>Cargando Generos...</p>
                                            )}

                                        </Select>
                                        {touched.gender && errors.gender ?
                                            <Typography color="error" variant="caption">
                                                {errors.gender}
                                            </Typography> : <span> &nbsp; </span>
                                        }
                                    </FormControl>

                                </Grid>
                                <Grid direction="column" size={{ xs: 12, md: 4 }} sx={{ mt: 0 }}>
                                    {/* DNI */}
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="dni"
                                        label="DNI"
                                        type="dni"
                                        id="dni"
                                        autoComplete="dni"
                                        value={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dni && Boolean(errors.dni)}
                                        helperText={touched.dni && errors.dni ? errors.dni : " "}
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "green",  // color verde solo cuando está enfocado
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                            },
                                        }}
                                    />
                                    {/* EMAIL */}
                                    <TextField
                                        variant='standard'
                                        fullWidth
                                        id="email"
                                        label="Dirección de correo"
                                        name="email"
                                        autoComplete="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email ? errors.email : " "} //
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "green",  // color verde solo cuando está enfocado
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'green', // color verde cuando está enfocado
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* BOTONES */}
                            <Grid container spacing={2}>

                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Button
                                        onClick={handleCloseJoinUp}
                                        variant="contained" fullWidth sx={{
                                            mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                            '&:hover': {
                                                backgroundColor: 'darkgrey', // Color al pasar el mouse
                                            },
                                        }}>
                                        CANCELAR
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
                                            '&:hover': {
                                                backgroundColor: 'darkred', // Color al pasar el mouse
                                            },
                                        }}
                                    >
                                        ENVIAR SOLICITUD
                                    </Button>



                                </Grid>

                            </Grid>

                        </Form>
                    )}
                </Formik>
                {/* </Box> */}
            </Paper>
        </Container>


    );
};

export default JoinUpForm;




