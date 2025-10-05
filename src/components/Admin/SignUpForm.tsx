import React, { useEffect, useState, useContext, use } from 'react';

import { useNavigate, useLocation } from "react-router-dom";
import { Input, Avatar, Box, Paper, Card, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import "../../css/index.css"

import avatar1 from "../../assets/avatars/1.jpg";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { Formik, Form, FormikHelpers, } from "formik";


// import useEmblaCarousel from 'embla-carousel-react'
// import Autoplay from 'embla-carousel-autoplay'

import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import * as Yup from "yup";

import { useParams } from "react-router-dom";

import { joinUpContext } from "../../Context/JoinUpContext"
import { getAllUsersContext } from "../../Context/GetAllUsersContext"
import { signUpContext } from '../../Context/SignUpContext';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, discipline: readonly string[], theme: Theme) {
    return {
        fontWeight: discipline.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

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
    applicationDate: Date;
}

const initialState = {
    nested_1: false,
    nested_2: false,
    nested_3: false,
    nested_4: false,
    nested_5: false,
    nested_6: false,
};

const stateKeys = Object.keys(initialState);

const SignUpForm: React.FC = () => {

    // const { categories } = useContext(getAllCategoriesContext)
    // const { disciplines } = useContext(getAllDisciplinesContext)

    const { setJoinUpUser } = useContext(joinUpContext)
    const { setSignUpUser, setIdForDeleteApplication, loading, setRejectApplication, setAcceptApplication } = useContext(signUpContext)
    const { loguedUserInformation } = useContext(getAllUsersContext)

    const genders = ["Masculino", "Femenino", "Otro"]

    const { type } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const location = useLocation();
    const user = location.state;
    console.log("USUARIO DE SOLICITUD", user)

    useEffect(() => {
        if (user) { setIdForDeleteApplication(user.id) }
    }, [user])



    // Validación con Yup
    // const validationSchema = Yup.object({
    //     name: Yup.string()
    //         .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
    //         .required("El campo es requerido"),
    //     lastName: Yup.string()
    //         .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
    //         .required("El campo es requerido"),
    //     birthDate: Yup.date()
    //         .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
    //         .required("El campo es requerido"),
    //     gender: Yup.string()
    //         .required("El campo es requerido"),
    //     dni: Yup.string()
    //         .matches(/^\d+$/, "El DNI debe contener solo números")
    //         .test(
    //             "longitud-dni",
    //             "El DNI debe tener entre 7 y 8 dígitos",
    //             (value) => value && value.length >= 7 && value.length <= 8
    //         )
    //         .required("El campo es requerido"),
    //     address: Yup.string()
    //         .min(5, "La dirección debe tener como mínimo 5 caracteres")
    //         .required("El campo es requerido"),
    //     contactNumber: Yup.string()
    //         .matches(/^\+?\d{7,15}$/, "Número de contacto inválido")
    //         .required("El campo es requerido"),
    //     // category: Yup.string()
    //     //     .required("El campo es requerido"),
    //     email: Yup.string()
    //         .when([], {
    //             is: () => type === "grouphead" || type === "unique",
    //             then: (schema) =>
    //                 schema
    //                     .required("El email es requerido")
    //                     .email("Dirección de correo electrónico inválida"),
    //             otherwise: (schema) => schema.notRequired(),
    //         }),
    // });

    const handleSubmit = (
        values: SignUpFormValues,
        formikHelpers: FormikHelpers<SignUpFormValues>
    ) => {

        const user = {
            name: values.name,
            lastName: values.lastName,
            address: values.address,
            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
            dni: values.dni,
            contactNumber: values.contactNumber,
            avatarURL: "",
            gender: values.gender,

            email: values.email,
            admin: false,

            disciplines: [],
            category: values.category,
            full: false,
            blockade: false,
            admition: "admited",
            familyGroup: [],

             applicationDate: values.applicationDate,
        };

        console.log("USER EN UI", user)
        setSignUpUser(user)
        // navigate("/");
    };


    return (

        <Container maxWidth="xl"  >
            <Formik<SignUpFormValues>
                initialValues={{
                    name: user.name,
                    lastName: user.lastName,
                    address: user.address,
                    birthDate: user.birthDate ? dayjs(new Date(user.birthDate.seconds * 1000)) : null,
                    gender: user.gender,
                    disciplines: user.disciplines,
                    dni: user.dni,
                    contactNumber: user.contactNumber,
                    avatarURL: user.avatarURL,
                    email: user.email,
                    admin: user.admin,
                    blockade: user.blockade,
                    category: user.category,
                    full: user.full,
                    familyGroup: user.familyGroup,
                    applicationDate: user.applicationDate
                }}

                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched, }) => (
                    <Form>

                        <Grid className="embla-form">

                            <Grid className="embla__container-form">
                                <Grid className="embla__slide-form">
                                    <Grid container columnSpacing={2} direction="row" size={12}>
                                        <Grid direction="row" size={1.3}>
                                        </Grid>
                                        <Grid direction="row" size={10.7}>
                                            <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                SOCIO UNICO / TITULAR
                                            </Typography>
                                        </Grid>
                                        {/* AVATAR */}

                                        <Grid direction="column" size={1.3}>
                                            <Avatar
                                                alt="Avatar"
                                                src={avatar1}
                                                sx={{
                                                    width: 110,
                                                    height: 110,
                                                    boxShadow: 4,
                                                    border: "3px solid #fff",
                                                    bgcolor: "#fff",
                                                    ml: 1,
                                                    mt: -3
                                                }}
                                            />
                                        </Grid>

                                        <Grid direction="column" size={3.35}>
                                            {/* NAME */}
                                            <TextField
                                                variant="standard"
                                                fullWidth
                                                name="name"
                                                label="Nombre"
                                                type="name"
                                                id="name"
                                                autoComplete="name"
                                                value={user.name}
                                                onChange={handleChange}
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
                                                value={user.address}
                                                onChange={handleChange}
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
                                                            handleChange({ target: { name: 'birthDate', value: newValue } }); // Update Formik state
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
                                            {/* CATEGORY */}
                                            {/* <FormControl fullWidth sx={{
                                                "& label.Mui-focused": {
                                                    color: "green",  // color verde solo cuando está enfocado
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottomColor: 'green', // color verde cuando está enfocado
                                                },
                                            }} variant='standard'>
                                                <InputLabel
                                                    error={touched.category && Boolean(errors.category)}
                                                    id="demo-simple-select-label"
                                                >Categoria</InputLabel>
                                                <Select
                                                    name="category"
                                                    onBlur={handleBlur}
                                                    variant='standard'
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={user.category} // Bind Formik value
                                                    label="Categoria" // Update label to match the field
                                                    onChange={(event) => {
                                                        handleChange({ target: { name: 'category', value: event.target.value } }); // Correctly update Formik state
                                                    }}


                                                >

                                                    {categories?.length > 0 ? (
                                                        categories.map(({ id, name }) => (
                                                            <MenuItem key={id} value={name}>
                                                                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <p>Cargando Categorias...</p>
                                                    )}

                                                </Select>
                                                {touched.category && errors.category ?
                                                    <Typography color="error" variant="caption">
                                                        {errors.category}
                                                    </Typography> : <span> &nbsp; </span>
                                                }
                                            </FormControl> */}

                                        </Grid>



                                        <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                            {/* LASTNAME */}
                                            <TextField
                                                // margin="normal"
                                                variant="standard"
                                                fullWidth
                                                name="lastName"
                                                label="Apellido/s"
                                                type="lastName"
                                                id="lastName"
                                                autoComplete="lastName"
                                                value={user.lastName}
                                                onChange={handleChange}
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
                                                value={user.contactNumber}
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
                                                    value={user.gender}
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

                                        <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                            <Grid container direction="column" size={10} >
                                                {/* DNI */}
                                                <TextField
                                                    variant="standard"
                                                    // margin="none"
                                                    fullWidth
                                                    name="dni"
                                                    label="DNI"
                                                    type="dni"
                                                    id="dni"
                                                    autoComplete="dni"
                                                    value={user.dni}
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
                                                    value={user.email}
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

                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>




                        {/* BOTONES */}
                        <Grid container spacing={2}>
                            <Grid container direction="column" size={1.3} sx={{ mt: 0 }}></Grid>
                            <Grid size={6.7}>
                                <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                    mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                    '&:hover': {
                                        backgroundColor: 'darkgrey', // Color al pasar el mouse
                                    },
                                }}>
                                    CANCELAR
                                </Button>
                            </Grid>
                            <Grid container size={4}>
                                <Grid size={10} container>
                                    <Grid size={6} >
                                        <Button
                                            type="submit"
                                            onClick={() => setAcceptApplication(true)}
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
                                                '&:hover': {
                                                    backgroundColor: 'darkred', // Color al pasar el mouse
                                                },
                                            }}
                                        >
                                            ACEPTAR SOLICITUD
                                        </Button>
                                    </Grid>
                                    <Grid size={6} >
                                        <Button
                                            type="submit"
                                            onClick={() => setRejectApplication(true)}
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
                                                '&:hover': {
                                                    backgroundColor: 'darkred', // Color al pasar el mouse
                                                },
                                            }}
                                        >
                                            RECHAZAR SOLICITUD
                                        </Button>
                                    </Grid>

                                </Grid>





                            </Grid>
                        </Grid>

                    </Form>
                )}
            </Formik>
        </Container>



    );
};

export default SignUpForm;





