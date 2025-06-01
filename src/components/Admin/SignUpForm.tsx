import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Avatar, Box, Paper, Card, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';




import avatar1 from "../../assets/avatars/1.jpg";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { Formik, Form, FormikHelpers, } from "formik";


import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import * as Yup from "yup";

import { useParams } from "react-router-dom";
import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext"
import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext"
import { getAllGendersContext } from "../../Context/GetAllGendersContext"
import { joinUpContext } from "../../Context/JoinUpContext"
import { getAllUsersContext } from "../../Context/GetAllUsersContext"




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
    // Campos base
    name: string;
    lastName: string;
    address: string;
    birthDate: Dayjs;
    dni: string;
    contactNumber: string;
    gender: string;
    disciplines: object;
    category: string;
    avatarURL: string;

    // Campos numerados del 1 al 6
    name_1: string;
    name_2: string;
    name_3: string;
    name_4: string;
    name_5: string;
    name_6: string;

    lastName_1: string;
    lastName_2: string;
    lastName_3: string;
    lastName_4: string;
    lastName_5: string;
    lastName_6: string;

    address_1: string;
    address_2: string;
    address_3: string;
    address_4: string;
    address_5: string;
    address_6: string;

    birthDate_1: Dayjs;
    birthDate_2: Dayjs;
    birthDate_3: Dayjs;
    birthDate_4: Dayjs;
    birthDate_5: Dayjs;
    birthDate_6: Dayjs;

    dni_1: string;
    dni_2: string;
    dni_3: string;
    dni_4: string;
    dni_5: string;
    dni_6: string;

    contactNumber_1: string;
    contactNumber_2: string;
    contactNumber_3: string;
    contactNumber_4: string;
    contactNumber_5: string;
    contactNumber_6: string;

    gender_1: string;
    gender_2: string;
    gender_3: string;
    gender_4: string;
    gender_5: string;
    gender_6: string;

    disciplines_1: object;
    disciplines_2: object;
    disciplines_3: object;
    disciplines_4: object;
    disciplines_5: object;
    disciplines_6: object;

    category_1: string;
    category_2: string;
    category_3: string;
    category_4: string;
    category_5: string;
    category_6: string;

    avatarURL_1: string;
    avatarURL_2: string;
    avatarURL_3: string;
    avatarURL_4: string;
    avatarURL_5: string;
    avatarURL_6: string;

    // Campos adicionales sin numerar
    email: string;
    admin: boolean;
    blockade: boolean;
    admited: boolean;
    groupHead: boolean;
    familyGroup: object;
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

    const { categories } = useContext(getAllCategoriesContext)
    const { disciplines } = useContext(getAllDisciplinesContext)
    const { genders } = useContext(getAllGendersContext)
    const { setJoinUpUser } = useContext(joinUpContext)
    const { loguedUserInformation } = useContext(getAllUsersContext)

    const [discipline, setDiscipline] = useState<string[]>([]);
    const [discipline_1, setDiscipline_1] = useState<string[]>([]);

    const [activeStep, setActiveStep] = useState(0);

    const [nested, setNested] = useState(initialState);
    console.log(nested)




    // Encuentra el primer estado en false para avanzar
    const addUser = () => {
        const idx = stateKeys.findIndex(key => !nested[key]);
        if (idx !== -1) {
            const key = stateKeys[idx];
            setNested(prev => ({ ...prev, [key]: true }));
        }
    };
    // Encuentra el último estado en true para retroceder
    const removeUser = () => {
        const idx = [...stateKeys].reverse().findIndex(key => nested[key]);
        if (idx !== -1) {
            const key = stateKeys[stateKeys.length - 1 - idx];
            setNested(prev => ({ ...prev, [key]: false }));
        }
    };
    const allFalse = Object.values(nested).every(value => value === false);
    const allTrue = Object.values(nested).every(value => value === true);

    const { type } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();


    const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDiscipline(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // Validación con Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
            .required("El campo es requerido"),
        lastName: Yup.string()
            .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
            .required("El campo es requerido"),
        birthDate: Yup.date()
            .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
            .required("El campo es requerido"),
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
        category: Yup.string()
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
        formikHelpers: FormikHelpers<SignUpFormValues>
    ) => {

        const familyGroup = [];

        for (let i = 1; i <= 6; i++) {
            if (nested[`nested_${i}`]) {
                familyGroup.push({
                    name: values[`name_${i}`],
                    lastName: values[`lastName_${i}`],
                    address: values[`address_${i}`],
                    birthDate: values[`birthDate_${i}`] ? dayjs(values[`birthDate_${i}`]).toDate() : null,
                    dni: values[`dni_${i}`],
                    contactNumber: values[`contactNumber_${i}`],
                    avatarURL: "",
                    gender: values[`gender_${i}`],

                    disciplines: discipline_1, // Si tienes disciplinas específicas para cada nested, ajusta aquí
                    category: values[`category_${i}`],

                    groupHead: false,
                });
            }
        }
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

            disciplines: discipline,
            category: values.category,
            blockade: false,
            admited: false,
            groupHead: true,
            familyGroup: familyGroup,
            // familyGroup: nested.nested_1
            //     ? [{
            //         name: values.name_1,
            //         lastName: values.lastName_1,
            //         address: values.address_1,
            //         birthDate: values.birthDate_1 ? dayjs(values.birthDate_1).toDate() : null,
            //         dni: values.dni_1,
            //         contactNumber: values.contactNumber_1,
            //         avatarURL: "",
            //         gender: values.gender_1,

            //         disciplines: discipline_1,
            //         category: values.category_1,

            //         groupHead: false,
            //     },
            //     ] : []
        };


        setJoinUpUser(user)
        // navigate("/");
    };


    const [emblaRef, embla] = useEmblaCarousel({ loop: false });

    useEffect(() => {
        if (embla && nested.nested_1) {
            // Usa setTimeout para dar tiempo a que el DOM se actualice
            const timer = setTimeout(() => {
                embla.scrollTo(1);
            }, 50); // 50 ms suele ser suficiente

            return () => clearTimeout(timer);
        }
        if (embla && !nested.nested_1) {
            embla.scrollTo(0);
        }
    }, [nested.nested_1, embla]);

    return (

        <Container maxWidth="xl"  >
            <Formik<SignUpFormValues>
                initialValues={{
                    name: "",
                    name_1: "",
                    name_2: "",
                    name_3: "",
                    name_4: "",
                    name_5: "",
                    name_6: "",

                    lastName: "",
                    lastName_1: "",
                    lastName_2: "",
                    lastName_3: "",
                    lastName_4: "",
                    lastName_5: "",
                    lastName_6: "",

                    address: "",
                    address_1: "",
                    address_2: "",
                    address_3: "",
                    address_4: "",
                    address_5: "",
                    address_6: "",

                    birthDate: null,
                    birthDate_1: null,
                    birthDate_2: null,
                    birthDate_3: null,
                    birthDate_4: null,
                    birthDate_5: null,
                    birthDate_6: null,

                    gender: "",
                    gender_1: "",
                    gender_2: "",
                    gender_3: "",
                    gender_4: "",
                    gender_5: "",
                    gender_6: "",

                    dni: "",
                    dni_1: "",
                    dni_2: "",
                    dni_3: "",
                    dni_4: "",
                    dni_5: "",
                    dni_6: "",

                    contactNumber: "",
                    contactNumber_1: "",
                    contactNumber_2: "",
                    contactNumber_3: "",
                    contactNumber_4: "",
                    contactNumber_5: "",
                    contactNumber_6: "",

                    avatarURL: "",
                    avatarURL_1: "",
                    avatarURL_2: "",
                    avatarURL_3: "",
                    avatarURL_4: "",
                    avatarURL_5: "",
                    avatarURL_6: "",

                    email: "",
                    admin: false,

                    disciplines: [],
                    disciplines_1: [],
                    disciplines_2: [],
                    disciplines_3: [],
                    disciplines_4: [],
                    disciplines_5: [],
                    disciplines_6: [],

                    category: "",
                    category_1: "",
                    category_2: "",
                    category_3: "",
                    category_4: "",
                    category_5: "",
                    category_6: "",

                    blockade: false,
                    admited: false,
                    groupHead: true,
                    familyGroup: [],
                }}

                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched, }) => (
                    <Form>

                        <Grid className="embla" ref={emblaRef}>
                            <Grid className="embla__container">
                                <Grid className="embla__slide">
                                    <Typography>FORMULARIO SOCIO CABECER</Typography>
                                </Grid>
                                {nested.nested_1 ? (
                                    <Grid className="embla__slide">
                                        <Typography>NESTED_1</Typography>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Grid>



                        <Grid container columnSpacing={2} direction="row" size={12}>
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
                                        mt: 1
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
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name ? errors.name : " "} // 
                                    sx={{ mb: 0 }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                            },
                                        },
                                        inputLabel: {
                                            sx: {
                                                "&.Mui-focused": {
                                                    color: "#b71c1c",
                                                },
                                            },
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address ? errors.address : " "}
                                    sx={{ mb: -1 }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                            },
                                        },
                                        inputLabel: {
                                            sx: {
                                                "&.Mui-focused": {
                                                    color: "#b71c1c",
                                                },
                                            },
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
                                                    InputLabelProps: {
                                                        style: {
                                                            color: touched.birthDate && errors.birthDate ? "#b71c1c" : undefined,
                                                        },
                                                    },
                                                    sx: {
                                                        width: '100%',
                                                        overflow: 'hidden', // <-- Oculta scroll
                                                        "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                                                        scrollbarWidth: "none", // Firefox
                                                        paddingRight: '4px',
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
                                {/* CATEGORI */}

                                <FormControl fullWidth sx={{ mb: 2, mt: 0 }} variant='standard'>
                                    <InputLabel
                                        error={touched.category && Boolean(errors.category)}
                                        id="demo-simple-select-label"
                                        sx={{
                                            "&.Mui-focused": {
                                                color: "#b71c1c", // Ensure label color changes when focused
                                            },
                                        }}>Categoria</InputLabel>
                                    <Select
                                        name="category"
                                        onBlur={handleBlur}
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: touched.category && errors.category ? "#b71c1c" : undefined,
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#b71c1c", // Change border color when focused
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#b71c1c", // Change border color on hover
                                            },
                                        }}

                                        variant='standard'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.category} // Bind Formik value
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
                                </FormControl>

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
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName ? errors.lastName : " "} // 
                                    sx={{ mt: 0 }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                            },
                                        },
                                        inputLabel: {
                                            sx: {
                                                "&.Mui-focused": {
                                                    color: "#b71c1c",
                                                },
                                            },
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
                                    sx={{ mt: 0 }}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#b71c1c",
                                                },
                                            },
                                        },
                                        inputLabel: {
                                            sx: {
                                                "&.Mui-focused": {
                                                    color: "#b71c1c",
                                                },
                                            },
                                        },
                                    }}
                                />

                                {/* GENDER */}
                                <FormControl fullWidth variant="standard">
                                    <InputLabel

                                        id="demo-simple-select-label"
                                        error={touched.gender && Boolean(errors.gender)}
                                        sx={{
                                            "&.Mui-focused": {
                                                color: "#b71c1c", // Ensure label color changes when focused

                                            },
                                        }}>Genero</InputLabel>
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
                                {/* DISCIPLINE */}
                                <FormControl fullWidth variant="standard" >
                                    <InputLabel
                                        id="demo-multiple-chip-label"
                                        sx={{
                                            "&.Mui-focused": {
                                                color: "#b71c1c", // color cuando está enfocado
                                            },
                                        }}
                                    >
                                        Disciplinas
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={discipline}
                                        onChange={(event) => {
                                            handleDiscipline(event);
                                            handleChange({ target: { name: "discipline", value: event.target.value } });
                                        }}
                                        sx={{
                                            // Elimina estilos de borde
                                            "&.Mui-focused": {
                                                borderColor: "transparent",
                                            },
                                            "&:hover": {
                                                borderColor: "transparent",
                                            },

                                        }}
                                        // Cambiar input a Input para variante standard sin borde
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {disciplines?.length > 0 ? (
                                            disciplines.map((item: any) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.name}
                                                    style={getStyles(item.name, discipline, theme)}
                                                >
                                                    <Checkbox checked={discipline.indexOf(item.name) > -1} />
                                                    <ListItemText
                                                        primary={
                                                            item.name.charAt(0).toUpperCase() +
                                                            item.name.slice(1).toLowerCase()
                                                        }
                                                    />
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <p>Cargando disciplinas...</p>
                                        )}
                                    </Select>
                                    {touched.disciplines && errors.disciplines ? (
                                        <Typography color="error" variant="caption">
                                            {/* {errors.disciplines} */}
                                        </Typography>
                                    ) : (
                                        <span> &nbsp; </span>
                                    )}
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
                                        value={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dni && Boolean(errors.dni)}
                                        helperText={touched.dni && errors.dni ? errors.dni : " "}
                                        sx={{ mt: 0 }}
                                        slotProps={{
                                            input: {
                                                sx: {
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                },
                                            },
                                            inputLabel: {
                                                sx: {
                                                    "&.Mui-focused": {
                                                        color: "#b71c1c",
                                                    },
                                                },
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
                                        sx={{ mt: 0 }}
                                        slotProps={{
                                            input: {
                                                sx: {
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#b71c1c",
                                                    },
                                                },
                                            },
                                            inputLabel: {
                                                sx: {
                                                    "&.Mui-focused": {
                                                        color: "#b71c1c",
                                                    },
                                                },
                                            },
                                        }}
                                    />
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
                                <Grid size={10}>
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
                                        {loguedUserInformation && loguedUserInformation.admin === true ? "REGISTRAR SOCIO" : "ENVIAR SOLICITUD"}
                                    </Button>
                                </Grid>

                                <Grid size={1}>
                                    <IconButton
                                        onClick={addUser}
                                        disabled={allTrue} // Disabled if all are true
                                        aria-label="Agregar socio"
                                        sx={{
                                            mt: 3,
                                            backgroundColor: '#b71c1c',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: 'darkred',
                                            },
                                        }}
                                    >
                                        <PersonAddIcon sx={{ fontSize: "medium" }} />
                                    </IconButton>
                                </Grid>
                                <Grid size={1}>
                                    <IconButton
                                        onClick={removeUser}
                                        disabled={allFalse} // Disabled if all are false
                                        aria-label="Agregar socio"
                                        sx={{
                                            mt: 3,
                                            backgroundColor: '#b71c1c',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: 'darkred',
                                            },
                                        }}
                                    >
                                        <PersonRemoveIcon sx={{ fontSize: "medium" }} />
                                    </IconButton>
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




