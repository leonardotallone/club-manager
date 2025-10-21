import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Switch, FormControlLabel, Avatar, Box, Paper, Card, Container, Typography, Checkbox, Button, TextField, Theme, useTheme, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Chip, OutlinedInput, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext"
import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext"
import { updateUserProfileContext } from "../../Context/UpdateUserProfileContext"
import { removeUserContext } from "../../Context/RemoveUserContext"
import { controlModalsContext } from '../../Context/ControModalsContext';

// import AddFamilyModal from './AddFamilyModal';
// import EditFamilyModal from './EditFamilyModal';

interface SignUpFormValues {

    name: string,
    lastName: string,
    address: string,
    birthDate: Dayjs
    dni: string,
    contactNumber: string,
    avatarURL: string,
    gender: string
    email: string,
    admin: boolean,
    disciplines: object,
    category: string,
    full: boolean,
    blockade: boolean,
    familyGroup: object,
    applicationDate: Dayjs,
}

type EditUserFormProps = {
    user: any; // o SignUpFormValues si ya lo tenés tipado
};



// Validación con Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
        .required("El campo es obligatorio"),
    lastName: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
        .required("El campo es obligatorio"),
    email: Yup.string()
        .email("Dirección de correo electrónico inválida")
        .required("El campo es obligatorio"),
    dni: Yup.string()
        .matches(/^\d+$/, "El DNI debe contener solo números")
        .test(
            "longitud-dni",
            "El DNI debe tener entre 7 y 8 dígitos",
            (value) => value && value.length >= 7 && value.length <= 8
        )
        .required("El campo es obligatorio"),
    address: Yup.string()
        .min(5, "La dirección debe tener como mínimo 5 caracteres")
        .required("El campo es obligatorio"),
    birthDate: Yup.date()
        .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
        .required("El campo es obligatorio"),
    contactNumber: Yup.string()
        .matches(/^\+?\d{7,15}$/, "Número de contacto inválido")
        .required("El campo es obligatorio"),
    // category: Yup.string()
    //     .required("El campo es obligatorio"),
});




const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {

    const { categories } = useContext(getAllCategoriesContext)
    const { disciplines } = useContext(getAllDisciplinesContext)
    const { userForEdit, setUpdateUserData, setDocId } = useContext(updateUserProfileContext)
    const { setUserConsent } = useContext(removeUserContext)
    const { setOpenAdd, setOpenEdit } = useContext(controlModalsContext)

    const [discipline, setDiscipline] = React.useState<string[]>([]);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [lockUser, setLockUser] = React.useState<boolean>(user.blockade);

    const [full, setFull] = useState<boolean>(user.full); // Estado del toggle
    // const [familyGroup, setFamilyGroup] = useState(user.familyGroup || []);




    const handleOpenAdd = () => setOpenAdd((prevOpen: any) => !prevOpen);
    const handleOpenEdit = () => setOpenEdit((prevOpen: any) => !prevOpen);

    const genders = ["Masculino", "Femenino", "Otro"]

    const familyGroupNames = user.familyGroup
        .map((member: { name: any; lastName: any; }) => `${member.name} ${member.lastName}`)
        .join(", ");

    useEffect(() => {
        if (user && user.id) {
            setDocId(user.id)
        }
    }, [user, setDocId])

    const theme = useTheme();
    const navigate = useNavigate();

    const handleToggleFull = () => {
        setFull(prev => !prev);
        console.log(full)
    }

    const handleEditMode = () => {
        setEditMode(prevEditMode => !prevEditMode);
    }
    const handleLockUser = (event: any) => {
        event.preventDefault();
        setLockUser(prevEditMode => !prevEditMode);
    }

    const handleRemoveUser = () => {
        setUserConsent(true);
    }

    useEffect(() => {
        if (user && user.disciplines) {
            setDiscipline(user.disciplines);
        }
    }, [user]);


    const handleDiscipline = (event: SelectChangeEvent<typeof discipline>) => {
        const {
            target: { value },
        } = event;
        setDiscipline(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (
        values: SignUpFormValues,
    ) => {
        const editedUser = {
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
            full: full,
            blockade: lockUser,

            familyGroup: user.familyGroup,
            applicationDate: values.applicationDate ? dayjs(values.applicationDate).toDate() : null,

        };
        setUpdateUserData(editedUser)

        // setEditMode(false);
        console.log("SUBMITED USER", editedUser);
        // navigate("/home");
    };

    return (
        <Box
            // component={Paper}
            // elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
                width: "100%",
                height: "auto",
            }}
        >
            <Container maxWidth="xl"  >
                <Formik<SignUpFormValues>
                    enableReinitialize={true}
                    initialValues={{
                        name: user.name || "",
                        lastName: user.lastName || "",
                        address: user.address || "",
                        birthDate: user.birthDate?.seconds ? dayjs(user.birthDate.seconds * 1000) : dayjs(),
                        dni: user.dni || "",
                        contactNumber: user.contactNumber || "",
                        avatarURL: user.avatarURL || "",
                        gender: user.gender || "",
                        email: user.email || "",
                        admin: false,
                        disciplines: user.disciplines || {},
                        category: categories?.find((c: { name: string }) => c.name === user.category)?.name || "",
                        full: user.full,

                        blockade: lockUser,
                        familyGroup: familyGroupNames || [],
                        applicationDate: user.applicationDate?.seconds ? dayjs(user.applicationDate.seconds * 1000) : dayjs(),
                    }}

                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, values, errors, touched, }) => (


                        <Form>
                            <Grid container columnSpacing={2} direction="row" size={12}>
                                {/* Columna IZQUIERDA */}
                                <Grid container direction="column" size={4}>
                                    <Grid size={12} >
                                        {/* AVATAR */}
                                        {/* <Box
                                            component={Card}
                                            elevation={1}
                                            sx={{
                                                display: "flex",
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                border: '1px solid rgba(240, 8, 8, 0.5)',
                                                height: '39%',
                                                mb: 3,
                                                mt: 1
                                            }}
                                        >
                                            <Avatar alt="Avatar" src={user.avatar} sx={{ width: 120, height: 120, ml: 3, boxShadow: 1 }} />
                                        </Box> */}
                                        {/* NAME */}
                                        <TextField
                                            variant="standard"
                                            fullWidth
                                            disabled={!editMode}
                                            id="name"
                                            name="name"
                                            label="Nombre"
                                            type="text"
                                            autoComplete="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name ? errors.name : " "}
                                            sx={{
                                                mt: 1,

                                                // ✨ Fuerza buena legibilidad cuando está desactivado
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#000000",
                                                    opacity: 1,
                                                },
                                                "& .MuiInputLabel-root.Mui-disabled": {
                                                    color: "#000000",
                                                    opacity: 0.7,
                                                },

                                                // 🔧 Mantiene la línea continua al estar deshabilitado
                                                "& .MuiInput-underline.Mui-disabled:before": {
                                                    borderBottomStyle: "solid",
                                                },
                                                "& .MuiInput-underline:before": {
                                                    borderColor: "rgba(0,0,0,0.42)",
                                                },
                                            }}
                                            slotProps={{
                                                input: {
                                                    sx: editMode
                                                        ? {
                                                            "&.Mui-focused .MuiInput-underline:after": {
                                                                borderBottomColor: "#b71c1c",
                                                            },
                                                            "&:hover .MuiInput-underline:before": {
                                                                borderBottomColor: "#b71c1c",
                                                            },
                                                        }
                                                        : {},
                                                },
                                                inputLabel: {
                                                    sx: editMode
                                                        ? {
                                                            "&.Mui-focused": {
                                                                color: "#b71c1c",
                                                            },
                                                        }
                                                        : {},
                                                },
                                            }}
                                        />


                                        {/* LASTNAME */}
                                        <TextField
                                            variant="standard"
                                            fullWidth
                                            disabled={!editMode}
                                            id="lastName"
                                            name="lastName"
                                            label="Apellido/s"
                                            type="text"
                                            autoComplete="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
                                            sx={{
                                                mt: 1,

                                                // ✨ Fuerza buena legibilidad cuando está desactivado
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    WebkitTextFillColor: "#000000",
                                                    opacity: 1,
                                                },
                                                "& .MuiInputLabel-root.Mui-disabled": {
                                                    color: "#000000",
                                                    opacity: 0.7,
                                                },

                                                // 🔧 Mantiene la línea continua al estar deshabilitado
                                                "& .MuiInput-underline.Mui-disabled:before": {
                                                    borderBottomStyle: "solid",
                                                },
                                                "& .MuiInput-underline:before": {
                                                    borderColor: "rgba(0,0,0,0.42)",
                                                },
                                            }}
                                            slotProps={{
                                                input: {
                                                    sx: editMode
                                                        ? {
                                                            "&.Mui-focused .MuiInput-underline:after": {
                                                                borderBottomColor: "#b71c1c",
                                                            },
                                                            "&:hover .MuiInput-underline:before": {
                                                                borderBottomColor: "#b71c1c",
                                                            },
                                                        }
                                                        : {},
                                                },
                                                inputLabel: {
                                                    sx: editMode
                                                        ? {
                                                            "&.Mui-focused": {
                                                                color: "#b71c1c",
                                                            },
                                                        }
                                                        : {},
                                                },
                                            }}
                                        />

                                    </Grid>
                                </Grid>
                                {/* Columna CENTRO */}
                                <Grid container direction="column" size={4}>
                                    <Grid container >
                                        {/* BIRTHDATE */}
                                        <Grid size={6} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                                                    <DatePicker

                                                        disabled={!editMode}
                                                        format="DD/MM/YYYY"
                                                        label="Fecha de Nacimiento"
                                                        value={values.birthDate}
                                                        onChange={(newValue) => {
                                                            handleChange({
                                                                target: { name: "birthDate", value: newValue },
                                                            });
                                                        }}
                                                        sx={{
                                                            width: "100%",

                                                            // ✨ Legibilidad total cuando está deshabilitado
                                                            "& .MuiInputBase-input.Mui-disabled": {
                                                                WebkitTextFillColor: "#000000",
                                                                opacity: 1,
                                                            },
                                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                                color: "#000000",
                                                                opacity: 0.7,
                                                            },
                                                            "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "rgba(0, 0, 0, 0.23)",
                                                            },

                                                            // 🎨 Estilos de foco y hover activos en modo edición
                                                            ...(editMode && {
                                                                "& .MuiInputLabel-root.Mui-focused": {
                                                                    color: "#b71c1c",
                                                                },
                                                                "& .MuiOutlinedInput-root": {
                                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                        borderColor: "#b71c1c",
                                                                    },
                                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                        borderColor: "#b71c1c",
                                                                    },
                                                                },
                                                            }),
                                                        }}
                                                    />
                                                </DemoContainer>

                                                {touched.birthDate && errors.birthDate ? (
                                                    <Typography
                                                        color="error"
                                                        variant="caption"
                                                        sx={{ fontSize: "0.75rem" }}
                                                    >
                                                        {errors.birthDate as string}
                                                    </Typography>
                                                ) : (
                                                    <span>&nbsp;</span>
                                                )}
                                            </LocalizationProvider>

                                        </Grid>
                                        {/* GENDER */}
                                        <Grid size={6} >

                                            <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
                                                <InputLabel
                                                    id="gender-label"
                                                    error={touched.gender && Boolean(errors.gender)}
                                                    sx={{
                                                        color: !editMode ? "rgba(0, 0, 0, 0.7)" : undefined,
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c",
                                                        },
                                                        "&.Mui-disabled": {
                                                            color: "#000000",
                                                            opacity: 0.7,
                                                        },
                                                    }}
                                                >
                                                    Género
                                                </InputLabel>

                                                <Select
                                                    disabled={!editMode}
                                                    labelId="gender-label"
                                                    id="gender"
                                                    name="gender"
                                                    value={values.gender}
                                                    onChange={(event) => {
                                                        handleChange({
                                                            target: { name: "gender", value: event.target.value },
                                                        });
                                                    }}
                                                    onBlur={handleBlur}
                                                    label="Género"
                                                    sx={{
                                                        // ✨ Legibilidad total si está deshabilitado
                                                        "& .MuiSelect-select.Mui-disabled": {
                                                            WebkitTextFillColor: "#000000",
                                                            opacity: 1,
                                                        },
                                                        "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                                        },
                                                        "&.Mui-disabled .MuiSvgIcon-root": {
                                                            color: "rgba(0,0,0,0.6)", // color del ícono del dropdown deshabilitado
                                                        },

                                                        // 🎨 Estilos activos en modo edición
                                                        ...(editMode && {
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderColor:
                                                                    touched.gender && errors.gender ? "#b71c1c" : "rgba(0, 0, 0, 0.23)",
                                                            },
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#b71c1c",
                                                            },
                                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "#b71c1c",
                                                            },
                                                        }),
                                                    }}
                                                >
                                                    {genders?.length > 0 ? (
                                                        genders.map((name) => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))
                                                    ) : (
                                                        <MenuItem disabled>Cargando géneros...</MenuItem>
                                                    )}
                                                </Select>

                                                {touched.gender && errors.gender ? (
                                                    <Typography color="error" variant="caption">
                                                        {errors.gender}
                                                    </Typography>
                                                ) : (
                                                    <span>&nbsp;</span>
                                                )}
                                            </FormControl>

                                        </Grid>
                                    </Grid>
                                    {/* DNI */}

                                    <TextField
                                        variant="standard"
                                        disabled={!editMode}
                                        fullWidth
                                        name="dni"
                                        label="DNI"
                                        type="text"
                                        id="dni"
                                        autoComplete="dni"
                                        value={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dni && Boolean(errors.dni)}
                                        helperText={touched.dni && errors.dni ? errors.dni : " "}
                                        sx={{
                                            mt: -2.8,

                                            // ✨ Legibilidad total al estar deshabilitado
                                            "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000", // texto negro
                                                opacity: 1,
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "#000000", // etiqueta legible
                                                opacity: 0.7,
                                            },

                                            // 🔧 Mantiene línea continua al estar deshabilitado
                                            "& .MuiInput-underline.Mui-disabled:before": {
                                                borderBottomStyle: "solid",
                                            },
                                            "& .MuiInput-underline:before": {
                                                borderColor: "rgba(0,0,0,0.42)",
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                sx: editMode
                                                    ? {
                                                        "&.Mui-focused .MuiInput-underline:after": {
                                                            borderBottomColor: "#b71c1c",
                                                        },
                                                        "&:hover .MuiInput-underline:before": {
                                                            borderBottomColor: "#b71c1c",
                                                        },
                                                    }
                                                    : {},
                                            },
                                            inputLabel: {
                                                sx: editMode
                                                    ? {
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c",
                                                        },
                                                    }
                                                    : {},
                                            },
                                        }}
                                    />

                                    {/* ADDRESS */}

                                    <TextField
                                        variant="standard"
                                        disabled={!editMode}
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
                                        sx={{
                                            mt: 1,
                                            "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000", // texto negro legible
                                                color: "#000",
                                                opacity: 1,
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "rgba(0, 0, 0, 0.6)",
                                            },
                                            "& .MuiInput-underline:before": {
                                                borderBottom: "1px dotted rgba(0,0,0,0.4) !important", // línea punteada base
                                            },
                                            "& .MuiInput-underline.Mui-disabled:before": {
                                                borderBottom: "1px dotted rgba(0,0,0,0.4) !important", // punteada visible en deshabilitado
                                            },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                borderBottom: "1px solid #b71c1c !important",
                                            },
                                            "& .MuiInput-underline.Mui-focused:after": {
                                                borderBottom: "2px solid #b71c1c !important", // foco rojo
                                            },
                                        }}
                                        slotProps={{
                                            inputLabel: {
                                                sx: editMode
                                                    ? {
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c",
                                                        },
                                                    }
                                                    : {},
                                            },
                                        }}
                                    />



                                    {/* CONTACT NUMBER */}

                                    <TextField
                                        variant="standard"
                                        disabled={!editMode}
                                        fullWidth
                                        name="contactNumber"
                                        label="Número de Contacto"
                                        type="text"
                                        id="contactNumber"
                                        autoComplete="contactNumber"
                                        value={values.contactNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.contactNumber && Boolean(errors.contactNumber)}
                                        helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : " "}
                                        sx={{
                                            mt: 1,

                                            // Legibilidad cuando está deshabilitado
                                            "& .MuiInputBase-input.Mui-disabled": {
                                                WebkitTextFillColor: "#000000",
                                                color: "#000000",
                                                opacity: 1,
                                            },
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                color: "rgba(0, 0, 0, 0.6)",
                                            },

                                            // Línea inferior continua para standard
                                            "& .MuiInput-underline:before": {
                                                borderBottom: "1px solid rgba(0,0,0,0.42)",
                                            },
                                            "& .MuiInput-underline.Mui-disabled:before": {
                                                borderBottom: "1px solid rgba(0,0,0,0.42)",
                                            },

                                            // Focus y hover en modo edición
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                borderBottomColor: "#b71c1c",
                                            },
                                            "& .MuiInput-underline.Mui-focused:after": {
                                                borderBottomColor: "#b71c1c",
                                            },
                                        }}
                                        slotProps={{
                                            inputLabel: {
                                                sx: editMode
                                                    ? {
                                                        "&.Mui-focused": {
                                                            color: "#b71c1c",
                                                        },
                                                    }
                                                    : {},
                                            },
                                        }}
                                    />

                                </Grid>
                                {/* Columna DERECHA */}
                                <Grid container direction="column" size={4} sx={{ mt: 0 }}>
                                    <Grid container size={12} >
                                        {/* DISCIPLINE */}
                                        <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
                                            <InputLabel
                                                id="discipline-label"
                                                shrink={true}
                                                sx={{
                                                    color: !editMode ? 'rgba(0, 0, 0, 0.38)' : undefined,
                                                    '&.Mui-focused': {
                                                        color: '#b71c1c',
                                                    },
                                                }}
                                            >
                                                Disciplinas
                                            </InputLabel>
                                            <Select
                                                labelId="discipline-label"
                                                id="discipline-select"
                                                multiple
                                                disabled={!editMode}
                                                value={discipline}
                                                onChange={(event) => {
                                                    handleDiscipline(event);
                                                    handleChange({ target: { name: 'discipline', value: event.target.value } });
                                                }}
                                                sx={editMode ? {
                                                    height: '56px',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: !editMode ? 'rgba(0, 0, 0, 0.12)' : undefined,
                                                    },
                                                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'rgba(0, 0, 0, 0.12)',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#b71c1c',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#b71c1c',
                                                    },
                                                } : { height: '56px' }}
                                                input={<OutlinedInput label="Disciplinas" id="discipline-select" notched={true} />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {(selected as string[]).map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}

                                            >
                                                {disciplines?.length > 0 ? (
                                                    disciplines.map((item: any) => (
                                                        <MenuItem
                                                            key={item.id}
                                                            value={item.name}
                                                        // style={getStyles(item.name, discipline, theme)}
                                                        >
                                                            <Checkbox checked={discipline.indexOf(item.name) > -1} />
                                                            {/* <ListItemText primary={item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} /> */}
                                                            <ListItemText primary={item.name || ""} />
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <p>Cargando disciplinas...</p>
                                                )}
                                            </Select>
                                            {touched.disciplines && errors.disciplines ? (
                                                <Typography color="error" variant="caption">
                                                    {typeof errors.disciplines === "string" ? errors.disciplines : JSON.stringify(errors.disciplines)}
                                                </Typography>
                                            ) : (
                                                <span>&nbsp;</span>
                                            )}
                                        </FormControl>

                                        <Grid size={12} >
                                            {/* CATEGORY */}


                                            <Grid display="flex" alignItems="center" gap={2} sx={{ mt: -0.8, mb: 3 }}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant='standard'
                                                        label="Categoría"
                                                        value={values.category + (full ? " - Pleno" : "")}
                                                        slotProps={{
                                                            htmlInput: {
                                                                readOnly: true,
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControlLabel
                                                    disabled={!editMode}
                                                    control={<Switch checked={full} onChange={handleToggleFull} />}
                                                    label="Pleno"
                                                />
                                            </Grid>


                                            {/* EMAIL */}
                                            <TextField
                                                variant="standard"
                                                disabled
                                                fullWidth
                                                id="email"
                                                label="Dirección de correo"
                                                name="email"
                                                autoComplete="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email ? errors.email : " "}
                                                sx={{
                                                    mt: 0.85,

                                                    // Texto legible aun deshabilitado
                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                        WebkitTextFillColor: "#000000",
                                                        color: "#000000",
                                                        opacity: 1,
                                                    },
                                                    "& .MuiInputLabel-root.Mui-disabled": {
                                                        color: "rgba(0, 0, 0, 0.6)",
                                                    },

                                                    // Línea inferior continua
                                                    "& .MuiInput-underline:before": {
                                                        borderBottom: "1px solid rgba(0,0,0,0.42)",
                                                    },
                                                    "& .MuiInput-underline.Mui-disabled:before": {
                                                        borderBottom: "1px solid rgba(0,0,0,0.42)",
                                                    },

                                                    // Focus rojo si editMode se aplicara
                                                    "& .MuiInput-underline.Mui-focused:after": {
                                                        borderBottomColor: "#b71c1c",
                                                    },
                                                }}
                                            />

                                            {/* FAMILY GROUP */}
                                            <TextField
                                                variant="standard"
                                                disabled
                                                fullWidth
                                                id="familyGroup"
                                                label="Grupo Familiar"
                                                name="familyGroup"
                                                autoComplete="familyGroup"
                                                value={familyGroupNames}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.familyGroup && Boolean(errors.familyGroup)}
                                                sx={{
                                                    mt: 0.85,

                                                    // Texto legible aun deshabilitado
                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                        WebkitTextFillColor: "#000000",
                                                        color: "#000000",
                                                        opacity: 1,
                                                    },
                                                    "& .MuiInputLabel-root.Mui-disabled": {
                                                        color: "rgba(0, 0, 0, 0.6)",
                                                    },

                                                    // Línea inferior continua
                                                    "& .MuiInput-underline:before": {
                                                        borderBottom: "1px solid rgba(0,0,0,0.42)",
                                                    },
                                                    "& .MuiInput-underline.Mui-disabled:before": {
                                                        borderBottom: "1px solid rgba(0,0,0,0.42)",
                                                    },

                                                    // Focus rojo si editMode se aplicara
                                                    "& .MuiInput-underline.Mui-focused:after": {
                                                        borderBottomColor: "#b71c1c",
                                                    },
                                                }}
                                            />

                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* BOTONES */}
                                <Grid size={4}>
                                    {editMode === true ?
                                        <Button onClick={handleEditMode} variant="contained" fullWidth sx={{
                                            mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                            '&:hover': {
                                                backgroundColor: 'darkgrey', // Color al pasar el mouse
                                            },
                                        }}>
                                            SALIR SIN CAMBIOS
                                        </Button> :
                                        <Button href={user.admin === true ? "/admin-users-list" : "/user-dashboard"} variant="contained" fullWidth sx={{
                                            mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                            '&:hover': {
                                                backgroundColor: 'darkgrey', // Color al pasar el mouse
                                            },
                                        }}>
                                            {user.admin ? "VOLVER A LISTA DE SOCIOS" : "VOLVER A INICIO"}

                                        </Button>}
                                </Grid>
                                <Grid container size={4}>
                                    <Grid size={6}>
                                        {user.admin === true ? <>
                                            {user.blockade === false ?
                                                <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                                    mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo gris
                                                    '&:hover': {
                                                        backgroundColor: 'darkred', // Color al pasar el mouse
                                                    },
                                                }}
                                                    onClick={handleLockUser}
                                                    disabled={!editMode}
                                                >
                                                    BLOQUEAR SOCIO
                                                </Button> :
                                                <Button href="/dashboard-admin-screen" variant="contained" fullWidth sx={{
                                                    mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo gris
                                                    '&:hover': {
                                                        backgroundColor: 'darkgrey', // Color al pasar el mouse
                                                    },
                                                }}
                                                    onClick={handleLockUser}
                                                    disabled={!editMode}
                                                >
                                                    DESBLOQUEAR SOCIO
                                                </Button>}</> : null}
                                    </Grid>
                                    {user.admin === false ?
                                        <Grid size={6}>
                                            <Button variant="contained" fullWidth sx={{
                                                mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo gris
                                                '&:hover': {
                                                    backgroundColor: 'darkred', // Color al pasar el mouse
                                                },
                                            }}
                                                startIcon={<DeleteIcon sx={{ fontSize: 1, color: "grey" }} />}
                                                onClick={handleRemoveUser}
                                                disabled={!editMode}
                                            >

                                                <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none', mr: 1 }}>
                                                    DARME DE BAJA
                                                </Typography>
                                            </Button>
                                        </Grid> : null}
                                </Grid>
                                <Grid size={4}>

                                    {!editMode ?
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 3, mb: 0, backgroundColor: 'grey', // Color de fondo rojo
                                                '&:hover': {
                                                    backgroundColor: 'darkgrey', // Color al pasar el mouse
                                                },
                                            }}
                                            onClick={handleEditMode}

                                        >
                                            EDITAR SOCIO
                                        </Button> : null}
                                    {editMode ? <>
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
                                        // onClick={handleEditMode}
                                        >
                                            GUARDAR CAMBIOS
                                        </Button>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={handleOpenAdd}
                                            sx={{
                                                mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
                                                '&:hover': {
                                                    backgroundColor: 'darkred', // Color al pasar el mouse
                                                },
                                            }}>AGREGAR SOCIO</Button>
                                        {/* Condiciona Visibilidad a la existencia de grupo familiar */}
                                        {Array.isArray(user.familyGroup) && user.familyGroup.length > 0 ?
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={handleOpenEdit}
                                                sx={{
                                                    mt: 3, mb: 0, backgroundColor: '#b71c1c', // Color de fondo rojo
                                                    '&:hover': {
                                                        backgroundColor: 'darkred', // Color al pasar el mouse
                                                    },
                                                }}>EDITAR GRUPO FAMILIAR</Button> : null}
                                    </> : null}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>



            {/*  MODALS*/}

            {/* <AddFamilyModal /> */}
            {/* <EditFamilyModal /> */}






        </Box >
    );
};

export default EditUserForm;




