import React, { useEffect, useState, useContext } from 'react';

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

const DisplayApplication: React.FC = () => {

    const { categories } = useContext(getAllCategoriesContext)
    const { disciplines } = useContext(getAllDisciplinesContext)
    const { genders } = useContext(getAllGendersContext)
    const { setJoinUpUser } = useContext(joinUpContext)
    const { loguedUserInformation } = useContext(getAllUsersContext)

    const [discipline, setDiscipline] = useState<string[]>([]);
    const [discipline_1, setDiscipline_1] = useState<string[]>([]);
    const [discipline_2, setDiscipline_2] = useState<string[]>([]);
    const [discipline_3, setDiscipline_3] = useState<string[]>([]);
    const [discipline_4, setDiscipline_4] = useState<string[]>([]);
    const [discipline_5, setDiscipline_5] = useState<string[]>([]);
    const [discipline_6, setDiscipline_6] = useState<string[]>([]);

    const [nested, setNested] = useState(initialState);


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

    const location = useLocation();
    const user = location.state;
    console.log(user)


    const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDiscipline(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDiscipline_1 = (event: SelectChangeEvent<typeof discipline_1>) => {
        const {
            target: { value },
        } = event;
        setDiscipline_1(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDisciplineGeneric = (
        event: SelectChangeEvent<string[] | string>,
        setState: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const {
            target: { value },
        } = event;
        setState(typeof value === 'string' ? value.split(',') : value);
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
        };

        console.log(user)
        // setJoinUpUser(user)
        // navigate("/");
    };


    const [emblaRef, embla] = useEmblaCarousel({ loop: false });

    useEffect(() => {
        if (!embla) return;

        // Busca el índice más alto de los nested activados (del 1 al 6)
        // Si ninguno está activo, targetIndex será 0 (slide principal)
        const activeIndexes = Object.entries(nested)
            .map(([key, value], idx) => (value ? idx + 1 : null)) // +1 porque el slide 0 es el principal
            .filter(idx => idx !== null);

        const targetIndex = activeIndexes.length ? Math.max(...activeIndexes) : 0;

        // Espera a que el DOM esté listo antes de hacer scroll
        const timer = setTimeout(() => {
            embla.scrollTo(targetIndex);
        }, 100);

        return () => clearTimeout(timer);

    }, [nested.nested_1, nested.nested_2, nested.nested_3, nested.nested_4, nested.nested_5, nested.nested_6, embla]);

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

                        <Grid className="embla-form" ref={emblaRef}>

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

                                            <FormControl fullWidth sx={{
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
                                            {/* DISCIPLINE */}
                                            <FormControl fullWidth variant="standard" sx={{
                                                "& label.Mui-focused": {
                                                    color: "green",  // color verde solo cuando está enfocado
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottomColor: 'green', // color verde cuando está enfocado
                                                },
                                            }} >
                                                <InputLabel id="demo-multiple-chip-label">
                                                    Disciplinas
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={discipline}
                                                    onChange={(event) => {
                                                        handleDisciplineGeneric(event, setDiscipline)
                                                        handleChange({ target: { name: "discipline", value: event.target.value } });
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

                                    </Grid>
                                </Grid>
                                {nested.nested_1 ? (
                                    <Grid className="embla__slide-form">
                                        <Grid container columnSpacing={2} direction="row" size={12}>
                                            <Grid direction="row" size={1.3}>
                                            </Grid>
                                            <Grid direction="row" size={10.7}>
                                                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                    FAMILIAR 1
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
                                                        mt: -3,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid direction="column" size={3.35}>
                                                {/* NAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="name_1"
                                                    label="Nombre"
                                                    type="name_1"
                                                    id="name_1"
                                                    autoComplete="name_1"
                                                    value={values.name_1}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name_1 && Boolean(errors.name_1)}
                                                    helperText={touched.name_1 && errors.name ? errors.name_1 : " "} // 
                                                    sx={{
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
                                                    name="address_1"
                                                    label="Domicilio"
                                                    type="address_1"
                                                    id="address_1"
                                                    autoComplete="address_1"
                                                    value={values.address_1}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_1 && Boolean(errors.address_1)}
                                                    helperText={touched.address_1 && errors.address_1 ? errors.address_1 : " "}
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
                                                            value={values.birthDate_1} // This should now be a Dayjs object
                                                            onChange={(newValue) => {
                                                                handleChange({ target: { name: 'birthDate_1', value: newValue } }); // Update Formik state
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    variant: 'standard',
                                                                    onBlur: () => handleBlur({ target: { name: 'birthDate_1' } }),
                                                                    InputLabelProps: {
                                                                        style: {
                                                                            color: touched.birthDate_1 && errors.birthDate_1 ? "#b71c1c" : undefined,
                                                                        },
                                                                    },
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
                                                    {touched.birthDate_1 && errors.birthDate_1 ?
                                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                            {errors.birthDate_1 as string}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </LocalizationProvider>
                                                {/* CATEGORY */}

                                                <FormControl fullWidth variant='standard' sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel
                                                        error={touched.category_1 && Boolean(errors.category_1)}
                                                        id="demo-simple-select-label">Categoria</InputLabel>
                                                    <Select
                                                        name="category_1"
                                                        onBlur={handleBlur}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.category_1} // Bind Formik value
                                                        label="Categoria" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'category_1', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.category_1 && errors.category_1 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category_1}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>

                                            </Grid>



                                            <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                                {/* LASTNAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="lastName_1"
                                                    label="Apellido/s"
                                                    type="lastName_1"
                                                    id="lastName_1"
                                                    autoComplete="lastName_1"
                                                    value={values.lastName_1}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.lastName_1 && Boolean(errors.lastName_1)}
                                                    helperText={touched.lastName_1 && errors.lastName_1 ? errors.lastName_1 : " "} // 
                                                    sx={{
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
                                                    variant="standard"
                                                    fullWidth
                                                    name="contactNumber_1"
                                                    label="Número de Contacto"
                                                    type="contactNumber_1"
                                                    id="contactNumber_1"
                                                    autoComplete="contactNumber_1"
                                                    value={values.contactNumber_1}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.contactNumber_1 && Boolean(errors.contactNumber_1)}
                                                    helperText={touched.contactNumber_1 && errors.contactNumber_1 ? errors.contactNumber_1 : " "}
                                                    sx={{
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
                                                }} >
                                                    <InputLabel
                                                        id="demo-simple-select-label"
                                                        error={touched.gender_1 && Boolean(errors.gender_1)}
                                                    >Genero</InputLabel>
                                                    <Select

                                                        labelId="gender-label"
                                                        id="gender_1"
                                                        name="gender_1"
                                                        value={values.gender_1}
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'gender_1', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.gender_1 && errors.gender_1 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.gender_1}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                                {/* DISCIPLINE */}
                                                <FormControl fullWidth variant="standard" sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel id="demo-multiple-chip-label">
                                                        Disciplinas
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={discipline_1}
                                                        onChange={(event) => {
                                                            handleDisciplineGeneric(event, setDiscipline_1)
                                                            handleChange({ target: { name: "discipline_1", value: event.target.value } });
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
                                                                    style={getStyles(item.name, discipline_1, theme)}
                                                                >
                                                                    <Checkbox checked={discipline_1.indexOf(item.name) > -1} />
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
                                                    {touched.disciplines_1 && errors.disciplines_1 ? (
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
                                                        name="dni_1"
                                                        label="DNI"
                                                        type="dni_1"
                                                        id="dni_1"
                                                        autoComplete="dni_1"
                                                        value={values.dni_1}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.dni_1 && Boolean(errors.dni_1)}
                                                        helperText={touched.dni_1 && errors.dni_1 ? errors.dni_1 : " "}
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
                                ) : null}
                                {nested.nested_2 ? (
                                    <Grid className="embla__slide-form">
                                        <Grid container columnSpacing={2} direction="row" size={12}>
                                            <Grid direction="row" size={1.3}>
                                            </Grid>
                                            <Grid direction="row" size={10.7}>
                                                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                    FAMILIAR 2
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
                                                        mt: -3,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid direction="column" size={3.35}>
                                                {/* NAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="name_2"
                                                    label="Nombre"
                                                    type="name_2"
                                                    id="name_2"
                                                    autoComplete="name_2"
                                                    value={values.name_2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name_2 && Boolean(errors.name_2)}
                                                    helperText={touched.name_2 && errors.name_2 ? errors.name_2 : " "} // 
                                                    sx={{
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
                                                    name="address_2"
                                                    label="Domicilio"
                                                    type="address_2"
                                                    id="address_2"
                                                    autoComplete="address_2"
                                                    value={values.address_2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_2 && Boolean(errors.address_2)}
                                                    helperText={touched.address_2 && errors.address_2 ? errors.address_2 : " "}
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
                                                            value={values.birthDate_2} // This should now be a Dayjs object
                                                            onChange={(newValue) => {
                                                                handleChange({ target: { name: 'birthDate_2', value: newValue } }); // Update Formik state
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    variant: 'standard',
                                                                    onBlur: () => handleBlur({ target: { name: 'birthDate_2' } }),
                                                                    InputLabelProps: {
                                                                        style: {
                                                                            color: touched.birthDate_2 && errors.birthDate_2 ? "#b71c1c" : undefined,
                                                                        },
                                                                    },
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
                                                    {touched.birthDate_2 && errors.birthDate_2 ?
                                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                            {errors.birthDate_2 as string}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </LocalizationProvider>
                                                {/* CATEGORY */}

                                                <FormControl fullWidth variant='standard' sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel
                                                        error={touched.category_2 && Boolean(errors.category_2)}
                                                        id="demo-simple-select-label"
                                                    >Categoria</InputLabel>
                                                    <Select
                                                        name="category_2"
                                                        onBlur={handleBlur}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.category_2} // Bind Formik value
                                                        label="Categoria" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'category_2', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.category_2 && errors.category_2 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category_2}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                            </Grid>


                                            <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                                {/* LASTNAME */}
                                                <TextField

                                                    variant="standard"
                                                    fullWidth
                                                    name="lastName_2"
                                                    label="Apellido/s"
                                                    type="lastName_2"
                                                    id="lastName_2"
                                                    autoComplete="lastName_2"
                                                    value={values.lastName_2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.lastName_2 && Boolean(errors.lastName_2)}
                                                    helperText={touched.lastName_2 && errors.lastName_2 ? errors.lastName_2 : " "} // 
                                                    sx={{
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
                                                    variant="standard"
                                                    fullWidth
                                                    name="contactNumber_2"
                                                    label="Número de Contacto"
                                                    type="contactNumber_2"
                                                    id="contactNumber_2"
                                                    autoComplete="contactNumber_2"
                                                    value={values.contactNumber_2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.contactNumber_2 && Boolean(errors.contactNumber_2)}
                                                    helperText={touched.contactNumber_2 && errors.contactNumber_2 ? errors.contactNumber_2 : " "}
                                                    sx={{
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
                                                }} >
                                                    <InputLabel
                                                        id="demo-simple-select-label"
                                                        error={touched.gender && Boolean(errors.gender)}
                                                    >Genero</InputLabel>
                                                    <Select
                                                        labelId="gender-label"
                                                        id="gender_2"
                                                        name="gender_2"
                                                        value={values.gender_2}
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'gender_2', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.gender_2 && errors.gender_2 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.gender_2}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                                {/* DISCIPLINE */}
                                                <FormControl fullWidth variant="standard" sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel id="demo-multiple-chip-label">
                                                        Disciplinas
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={discipline_2}
                                                        onChange={(event) => {
                                                            handleDisciplineGeneric(event, setDiscipline_2)
                                                            handleChange({ target: { name: "discipline_2", value: event.target.value } });
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
                                                                    style={getStyles(item.name, discipline_2, theme)}
                                                                >
                                                                    <Checkbox checked={discipline_2.indexOf(item.name) > -1} />
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
                                                </FormControl>

                                            </Grid>

                                            <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                                <Grid container direction="column" size={10} >
                                                    {/* DNI */}
                                                    <TextField
                                                        variant="standard"
                                                        fullWidth
                                                        name="dni_2"
                                                        label="DNI"
                                                        type="dni_2"
                                                        id="dni_2"
                                                        autoComplete="dni_2"
                                                        value={values.dni_2}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.dni_2 && Boolean(errors.dni_2)}
                                                        helperText={touched.dni_2 && errors.dni_2 ? errors.dni_2 : " "}
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
                                ) : null}
                                {nested.nested_3 ? (
                                    <Grid className="embla__slide-form">
                                        <Grid container columnSpacing={2} direction="row" size={12}>
                                            <Grid direction="row" size={1.3}>
                                            </Grid>
                                            <Grid direction="row" size={10.7}>
                                                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                    FAMILIAR 3
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
                                                        mt: -3,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid direction="column" size={3.35}>
                                                {/* NAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="name_3"
                                                    label="Nombre"
                                                    type="name_3"
                                                    id="name_3"
                                                    autoComplete="name_3"
                                                    value={values.name_3}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name_3 && Boolean(errors.name_3)}
                                                    helperText={touched.name_3 && errors.name_3 ? errors.name_3 : " "} // 
                                                    sx={{
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
                                                    name="address_3"
                                                    label="Domicilio"
                                                    type="address_3"
                                                    id="address_3"
                                                    autoComplete="address_3"
                                                    value={values.address_3}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_3 && Boolean(errors.address_3)}
                                                    helperText={touched.address_3 && errors.address_3 ? errors.address_3 : " "}
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
                                                            value={values.birthDate_3} // This should now be a Dayjs object
                                                            onChange={(newValue) => {
                                                                handleChange({ target: { name: 'birthDate_3', value: newValue } }); // Update Formik state
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    variant: 'standard',
                                                                    onBlur: () => handleBlur({ target: { name: 'birthDate_3' } }),
                                                                    InputLabelProps: {
                                                                        style: {
                                                                            color: touched.birthDate_3 && errors.birthDate_3 ? "#b71c1c" : undefined,
                                                                        },
                                                                    },
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
                                                    {touched.birthDate_3 && errors.birthDate_3 ?
                                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                            {errors.birthDate_3 as string}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </LocalizationProvider>
                                                {/* CATEGORY */}

                                                <FormControl fullWidth variant='standard' sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel
                                                        error={touched.category_3 && Boolean(errors.category_3)}
                                                        id="demo-simple-select-label"
                                                    >Categoria</InputLabel>
                                                    <Select
                                                        name="category_3"
                                                        onBlur={handleBlur}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.category_3} // Bind Formik value
                                                        label="Categoria" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'category_3', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.category_3 && errors.category_3 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category_3}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                            </Grid>


                                            <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                                {/* LASTNAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="lastName_3"
                                                    label="Apellido/s"
                                                    type="lastName_3"
                                                    id="lastName_3"
                                                    autoComplete="lastName_3"
                                                    value={values.lastName_3}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.lastName_3 && Boolean(errors.lastName_3)}
                                                    helperText={touched.lastName_3 && errors.lastName_3 ? errors.lastName_3 : " "} // 
                                                    sx={{
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
                                                    variant="standard"
                                                    fullWidth
                                                    name="contactNumber_3"
                                                    label="Número de Contacto"
                                                    type="contactNumber_3"
                                                    id="contactNumber_3"
                                                    autoComplete="contactNumber_3"
                                                    value={values.contactNumber_3}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.contactNumber_3 && Boolean(errors.contactNumber_3)}
                                                    helperText={touched.contactNumber_3 && errors.contactNumber_3 ? errors.contactNumber_3 : " "}
                                                    sx={{
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
                                                }} >
                                                    <InputLabel
                                                        id="demo-simple-select-label"
                                                        error={touched.gender_3 && Boolean(errors.gender_3)}
                                                    >Genero</InputLabel>
                                                    <Select
                                                        labelId="gender-label"
                                                        id="gender_3"
                                                        name="gender_3"
                                                        value={values.gender_3}
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'gender_3', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.gender_3 && errors.gender_3 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.gender_3}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                                {/* DISCIPLINE */}
                                                <FormControl fullWidth variant="standard" sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel id="demo-multiple-chip-label">
                                                        Disciplinas
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={discipline_3}
                                                        onChange={(event) => {
                                                            handleDisciplineGeneric(event, setDiscipline_3)
                                                            handleChange({ target: { name: "discipline_3", value: event.target.value } });
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
                                                                    style={getStyles(item.name, discipline_3, theme)}
                                                                >
                                                                    <Checkbox checked={discipline_3.indexOf(item.name) > -1} />
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
                                                </FormControl>

                                            </Grid>

                                            <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                                <Grid container direction="column" size={10} >
                                                    {/* DNI */}
                                                    <TextField
                                                        variant="standard"
                                                        fullWidth
                                                        name="dni_3"
                                                        label="DNI"
                                                        type="dni_3"
                                                        id="dni_3"
                                                        autoComplete="dni_3"
                                                        value={values.dni_3}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.dni_3 && Boolean(errors.dni_3)}
                                                        helperText={touched.dni_3 && errors.dni_3 ? errors.dni_3 : " "}
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
                                ) : null}
                                {nested.nested_4 ? (
                                    <Grid className="embla__slide-form">
                                        <Grid container columnSpacing={2} direction="row" size={12}>
                                            <Grid direction="row" size={1.3}>
                                            </Grid>
                                            <Grid direction="row" size={10.7}>
                                                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                    FAMILIAR 4
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
                                                        mt: -3,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid direction="column" size={3.35}>
                                                {/* NAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="name_4"
                                                    label="Nombre"
                                                    type="name_4"
                                                    id="name_4"
                                                    autoComplete="name_4"
                                                    value={values.name_4}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name_4 && Boolean(errors.name_4)}
                                                    helperText={touched.name_4 && errors.name_4 ? errors.name_4 : " "} // 
                                                    sx={{
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
                                                    name="address_4"
                                                    label="Domicilio"
                                                    type="address_4"
                                                    id="address_4"
                                                    autoComplete="address_4"
                                                    value={values.address_4}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_4 && Boolean(errors.address_4)}
                                                    helperText={touched.address_4 && errors.address_4 ? errors.address_4 : " "}
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
                                                            value={values.birthDate_4} // This should now be a Dayjs object
                                                            onChange={(newValue) => {
                                                                handleChange({ target: { name: 'birthDate_4', value: newValue } }); // Update Formik state
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    variant: 'standard',
                                                                    onBlur: () => handleBlur({ target: { name: 'birthDate_4' } }),
                                                                    InputLabelProps: {
                                                                        style: {
                                                                            color: touched.birthDate_4 && errors.birthDate_4 ? "#b71c1c" : undefined,
                                                                        },
                                                                    },
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
                                                    {touched.birthDate_4 && errors.birthDate_4 ?
                                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                            {errors.birthDate_4 as string}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </LocalizationProvider>
                                                {/* CATEGORY */}

                                                <FormControl fullWidth variant='standard' sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel
                                                        error={touched.category_4 && Boolean(errors.category_4)}
                                                        id="demo-simple-select-label"
                                                    >Categoria</InputLabel>
                                                    <Select
                                                        name="category_4"
                                                        onBlur={handleBlur}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.category_4} // Bind Formik value
                                                        label="Categoria" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'category_4', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.category_4 && errors.category_4 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category_4}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                            </Grid>


                                            <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                                {/* LASTNAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="lastName_4"
                                                    label="Apellido/s"
                                                    type="lastName_4"
                                                    id="lastName_4"
                                                    autoComplete="lastName_4"
                                                    value={values.lastName_4}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.lastName_4 && Boolean(errors.lastName_4)}
                                                    helperText={touched.lastName_4 && errors.lastName_4 ? errors.lastName_4 : " "} // 
                                                    sx={{
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
                                                    variant="standard"
                                                    fullWidth
                                                    name="contactNumber_4"
                                                    label="Número de Contacto"
                                                    type="contactNumber_4"
                                                    id="contactNumber_4"
                                                    autoComplete="contactNumber_4"
                                                    value={values.contactNumber_4}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.contactNumber_4 && Boolean(errors.contactNumber_4)}
                                                    helperText={touched.contactNumber_4 && errors.contactNumber_4 ? errors.contactNumber_4 : " "}
                                                    sx={{
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
                                                }} >
                                                    <InputLabel
                                                        id="demo-simple-select-label"
                                                        error={touched.gender_4 && Boolean(errors.gender_4)}
                                                    >Genero</InputLabel>
                                                    <Select
                                                        labelId="gender-label"
                                                        id="gender_4"
                                                        name="gender_4"
                                                        value={values.gender_4}
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'gender_4', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.gender_4 && errors.gender_4 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.gender_4}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                                {/* DISCIPLINE */}
                                                <FormControl fullWidth variant="standard" sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel id="demo-multiple-chip-label">
                                                        Disciplinas
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={discipline_4}
                                                        onChange={(event) => {
                                                            handleDisciplineGeneric(event, setDiscipline_4)
                                                            handleChange({ target: { name: "discipline_4", value: event.target.value } });
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
                                                                    style={getStyles(item.name, discipline_4, theme)}
                                                                >
                                                                    <Checkbox checked={discipline_4.indexOf(item.name) > -1} />
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
                                                </FormControl>

                                            </Grid>

                                            <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                                <Grid container direction="column" size={10} >
                                                    {/* DNI */}
                                                    <TextField
                                                        variant="standard"
                                                        fullWidth
                                                        name="dni_4"
                                                        label="DNI"
                                                        type="dni_4"
                                                        id="dni_4"
                                                        autoComplete="dni_4"
                                                        value={values.dni_4}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.dni_4 && Boolean(errors.dni_4)}
                                                        helperText={touched.dni_4 && errors.dni_4 ? errors.dni_4 : " "}
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
                                ) : null}
                                {nested.nested_5 ? (
                                    <Grid className="embla__slide-form">
                                        <Grid container columnSpacing={2} direction="row" size={12}>
                                            <Grid direction="row" size={1.3}>
                                            </Grid>
                                            <Grid direction="row" size={10.7}>
                                                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                    FAMILIAR 5
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
                                                        mt: -3,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid direction="column" size={3.35}>
                                                {/* NAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="name_5"
                                                    label="Nombre"
                                                    type="name_5"
                                                    id="name_5"
                                                    autoComplete="name_5"
                                                    value={values.name_5}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name_5 && Boolean(errors.name_5)}
                                                    helperText={touched.name_5 && errors.name_5 ? errors.name_5 : " "} // 
                                                    sx={{
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
                                                    name="address_5"
                                                    label="Domicilio"
                                                    type="address_5"
                                                    id="address_5"
                                                    autoComplete="address_5"
                                                    value={values.address_5}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_5 && Boolean(errors.address_5)}
                                                    helperText={touched.address_5 && errors.address_5 ? errors.address_5 : " "}
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
                                                            value={values.birthDate_5} // This should now be a Dayjs object
                                                            onChange={(newValue) => {
                                                                handleChange({ target: { name: 'birthDate_5', value: newValue } }); // Update Formik state
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    variant: 'standard',
                                                                    onBlur: () => handleBlur({ target: { name: 'birthDate_5' } }),
                                                                    InputLabelProps: {
                                                                        style: {
                                                                            color: touched.birthDate_5 && errors.birthDate_5 ? "#b71c1c" : undefined,
                                                                        },
                                                                    },
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
                                                    {touched.birthDate_5 && errors.birthDate_5 ?
                                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                            {errors.birthDate_5 as string}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </LocalizationProvider>
                                                {/* CATEGORY */}

                                                <FormControl fullWidth variant='standard' sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel
                                                        error={touched.category_5 && Boolean(errors.category_5)}
                                                        id="demo-simple-select-label"
                                                    >Categoria</InputLabel>
                                                    <Select
                                                        name="category_5"
                                                        onBlur={handleBlur}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.category_5} // Bind Formik value
                                                        label="Categoria" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'category_5', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.category_5 && errors.category_5 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category_5}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                            </Grid>


                                            <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                                {/* LASTNAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="lastName_5"
                                                    label="Apellido/s"
                                                    type="lastName_5"
                                                    id="lastName_5"
                                                    autoComplete="lastName_5"
                                                    value={values.lastName_5}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.lastName_5 && Boolean(errors.lastName_5)}
                                                    helperText={touched.lastName_5 && errors.lastName_5 ? errors.lastName_5 : " "} // 
                                                    sx={{
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
                                                    variant="standard"
                                                    fullWidth
                                                    name="contactNumber_5"
                                                    label="Número de Contacto"
                                                    type="contactNumber_5"
                                                    id="contactNumber_5"
                                                    autoComplete="contactNumber_5"
                                                    value={values.contactNumber_5}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.contactNumber_5 && Boolean(errors.contactNumber_5)}
                                                    helperText={touched.contactNumber_5 && errors.contactNumber_5 ? errors.contactNumber_5 : " "}
                                                    sx={{
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
                                                }} >
                                                    <InputLabel
                                                        id="demo-simple-select-label"
                                                        error={touched.gender_5 && Boolean(errors.gender_5)}
                                                    >Genero</InputLabel>
                                                    <Select
                                                        labelId="gender-label"
                                                        id="gender_5"
                                                        name="gender_5"
                                                        value={values.gender_5}
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'gender_5', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.gender_5 && errors.gender_5 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.gender_5}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                                {/* DISCIPLINE */}
                                                <FormControl fullWidth variant="standard" sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel id="demo-multiple-chip-label">
                                                        Disciplinas
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={discipline_5}
                                                        onChange={(event) => {
                                                            handleDisciplineGeneric(event, setDiscipline_5)
                                                            handleChange({ target: { name: "discipline_5", value: event.target.value } });
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
                                                                    style={getStyles(item.name, discipline_5, theme)}
                                                                >
                                                                    <Checkbox checked={discipline_5.indexOf(item.name) > -1} />
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
                                                </FormControl>

                                            </Grid>

                                            <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                                <Grid container direction="column" size={10} >
                                                    {/* DNI */}
                                                    <TextField
                                                        variant="standard"
                                                        fullWidth
                                                        name="dni_5"
                                                        label="DNI"
                                                        type="dni_5"
                                                        id="dni_5"
                                                        autoComplete="dni_5"
                                                        value={values.dni_5}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.dni_5 && Boolean(errors.dni_5)}
                                                        helperText={touched.dni_5 && errors.dni_5 ? errors.dni_5 : " "}
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
                                ) : null}
                                {nested.nested_6 ? (
                                    <Grid className="embla__slide-form">
                                        <Grid container columnSpacing={2} direction="row" size={12}>
                                            <Grid direction="row" size={1.3}>
                                            </Grid>
                                            <Grid direction="row" size={10.7}>
                                                <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#616161', textDecoration: 'none', mb: 1 }}>
                                                    FAMILIAR 6
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
                                                        mt: -3,
                                                    }}
                                                />
                                            </Grid>

                                            <Grid direction="column" size={3.35}>
                                                {/* NAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="name_6"
                                                    label="Nombre"
                                                    type="name_6"
                                                    id="name_6"
                                                    autoComplete="name_6"
                                                    value={values.name_6}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.name_6 && Boolean(errors.name_6)}
                                                    helperText={touched.name_6 && errors.name_6 ? errors.name_6 : " "} // 
                                                    sx={{
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
                                                    name="address_6"
                                                    label="Domicilio"
                                                    type="address_6"
                                                    id="address_6"
                                                    autoComplete="address_6"
                                                    value={values.address_6}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.address_6 && Boolean(errors.address_6)}
                                                    helperText={touched.address_6 && errors.address_6 ? errors.address_6 : " "}
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
                                                            value={values.birthDate_6} // This should now be a Dayjs object
                                                            onChange={(newValue) => {
                                                                handleChange({ target: { name: 'birthDate_6', value: newValue } }); // Update Formik state
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    variant: 'standard',
                                                                    onBlur: () => handleBlur({ target: { name: 'birthDate_6' } }),
                                                                    InputLabelProps: {
                                                                        style: {
                                                                            color: touched.birthDate_6 && errors.birthDate_6 ? "#b71c1c" : undefined,
                                                                        },
                                                                    },
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
                                                    {touched.birthDate_6 && errors.birthDate_6 ?
                                                        <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
                                                            {errors.birthDate_6 as string}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </LocalizationProvider>
                                                {/* CATEGORY */}
                                                <FormControl fullWidth variant='standard' sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel
                                                        error={touched.category_6 && Boolean(errors.category_6)}
                                                        id="demo-simple-select-label"
                                                    >Categoria</InputLabel>
                                                    <Select
                                                        name="category_6"
                                                        onBlur={handleBlur}
                                                        variant='standard'
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values.category_6} // Bind Formik value
                                                        label="Categoria" // Update label to match the field
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'category_6', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.category_6 && errors.category_6 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.category_6}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                            </Grid>


                                            <Grid direction="column" size={3.35} sx={{ mt: 0 }}>
                                                {/* LASTNAME */}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    name="lastName_6"
                                                    label="Apellido/s"
                                                    type="lastName_6"
                                                    id="lastName_6"
                                                    autoComplete="lastName_6"
                                                    value={values.lastName_6}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.lastName_6 && Boolean(errors.lastName_6)}
                                                    helperText={touched.lastName_6 && errors.lastName_6 ? errors.lastName_6 : " "} // 
                                                    sx={{
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
                                                    variant="standard"
                                                    fullWidth
                                                    name="contactNumber_6"
                                                    label="Número de Contacto"
                                                    type="contactNumber_6"
                                                    id="contactNumber_6"
                                                    autoComplete="contactNumber_6"
                                                    value={values.contactNumber_6}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.contactNumber_6 && Boolean(errors.contactNumber_6)}
                                                    helperText={touched.contactNumber_6 && errors.contactNumber_6 ? errors.contactNumber_6 : " "}
                                                    sx={{
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
                                                }} >
                                                    <InputLabel
                                                        id="demo-simple-select-label"
                                                        error={touched.gender_6 && Boolean(errors.gender_6)}
                                                    >Genero</InputLabel>
                                                    <Select
                                                        labelId="gender-label"
                                                        id="gender_6"
                                                        name="gender_6"
                                                        value={values.gender_6}
                                                        onChange={(event) => {
                                                            handleChange({ target: { name: 'gender_6', value: event.target.value } }); // Correctly update Formik state
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
                                                    {touched.gender_6 && errors.gender_6 ?
                                                        <Typography color="error" variant="caption">
                                                            {errors.gender_6}
                                                        </Typography> : <span> &nbsp; </span>
                                                    }
                                                </FormControl>
                                                {/* DISCIPLINE */}
                                                <FormControl fullWidth variant="standard" sx={{
                                                    "& label.Mui-focused": {
                                                        color: "green",  // color verde solo cuando está enfocado
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: 'green', // color verde cuando está enfocado
                                                    },
                                                }} >
                                                    <InputLabel id="demo-multiple-chip-label">
                                                        Disciplinas
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={discipline_6}
                                                        onChange={(event) => {
                                                            handleDisciplineGeneric(event, setDiscipline_6)
                                                            handleChange({ target: { name: "discipline_6", value: event.target.value } });
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
                                                                    style={getStyles(item.name, discipline_6, theme)}
                                                                >
                                                                    <Checkbox checked={discipline_6.indexOf(item.name) > -1} />
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
                                                </FormControl>

                                            </Grid>

                                            <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                                <Grid container direction="column" size={10} >
                                                    {/* DNI */}
                                                    <TextField
                                                        variant="standard"
                                                        fullWidth
                                                        name="dni_6"
                                                        label="DNI"
                                                        type="dni_6"
                                                        id="dni_6"
                                                        autoComplete="dni_6"
                                                        value={values.dni_6}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.dni_6 && Boolean(errors.dni_6)}
                                                        helperText={touched.dni_6 && errors.dni_6 ? errors.dni_6 : " "}
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
                                ) : null}
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

                            </Grid>
                        </Grid>

                    </Form>
                )}
            </Formik>
        </Container>



    );
};

export default DisplayApplication;





