import React, { useEffect, useContext, useState } from 'react';
import { Modal, Box, FormControlLabel, Switch, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import { getAllCategoriesContext } from "../../Context/GetAllCategoriesContext";
import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext";
import { updateUserProfileContext } from "../../Context/UpdateUserProfileContext";
import { removeUserContext } from "../../Context/RemoveUserContext";
import { controlModalsContext } from '../../Context/ControModalsContext';

const validationSchemaFamily = Yup.object({
    name: Yup.string().matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato incorrecto").required("Campo obligatorio"),
    lastName: Yup.string().matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato incorrecto").required("Campo obligatorio"),
    birthDate: Yup.date().max(new Date(), "No puede ser futura").required("Campo obligatorio"),
    dni: Yup.string().matches(/^\d+$/, "Solo números").min(7).max(8).required("Campo obligatorio"),
});

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditFamilyModal: React.FC = () => {
    // const { categories } = useContext(getAllCategoriesContext);
    const { disciplines } = useContext(getAllDisciplinesContext);
    const { userForEdit, setDocId, setUpdateFamilyUser, setRemoveFamilyMember } = useContext(updateUserProfileContext);
    const { setUserConsent } = useContext(removeUserContext);
    const { openEdit, setOpenEdit } = useContext(controlModalsContext);

    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [disciplineFamily, setDisciplineFamily] = useState<string[]>([]);
    const [full, setFull] = useState<boolean>(userForEdit.full); // Estado del toggle
    
    const user = userForEdit

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedMember(null);
        setDisciplineFamily([]);
    };


    useEffect(() => {
        if (user && user.id) setDocId(user.id);
    }, [user, setDocId]);

    useEffect(() => {
        if (!openEdit) {
            setSelectedMember(null);
            setDisciplineFamily([]);
        }
    }, [openEdit]);

    const handleToggleFull = () => {
        setFull(prev => !prev);
        console.log(full)
    }
    const handleDeleteMember = () => {
        setRemoveFamilyMember(selectedMember)
    }

    return (
        <Modal open={openEdit} onClose={handleCloseEdit}>
            <Box sx={ModalStyle}>
                <Formik
                    initialValues={{
                        name: "",
                        lastName: "",
                        birthDate: null,
                        dni: "",
                        gender: "",
                        disciplines: [],
                        category: "",
                        applicationDate: dayjs(),
                    }}
                    validationSchema={validationSchemaFamily}
                    onSubmit={(values) => {
                        // Convertimos las fechas a Date antes de enviar a Firestore
                        const formatted = {
                            ...values,
                            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
                            applicationDate: values.applicationDate ? dayjs(values.applicationDate).toDate() : new Date(),
                        };

                        setUpdateFamilyUser(formatted);
                        handleCloseEdit();
                    }}
                >
                    {({ handleChange, handleBlur, values, errors, touched, setValues }) => (
                        <Form>
                            <Grid container columnSpacing={2} direction="row" size={12}>
                                {/* FAMILY GROUP SELECTOR */}
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="familyGroup-label">Seleccionar Familiar</InputLabel>
                                    <Select
                                        labelId="familyGroup-label"
                                        value={selectedMember ? selectedMember.dni : ""}
                                        label="Seleccionar Familiar"
                                        onChange={(event) => {
                                            const selected = user.familyGroup.find((m) => m.dni === event.target.value);
                                            setSelectedMember(selected);
                                            setDisciplineFamily(selected?.disciplines || []);

                                            // Seteamos los valores del formulario
                                            setValues({
                                                name: selected?.name || "",
                                                lastName: selected?.lastName || "",
                                                birthDate: selected?.birthDate
                                                    ? dayjs(selected.birthDate.seconds
                                                        ? selected.birthDate.seconds * 1000
                                                        : selected.birthDate
                                                    )
                                                    : null,
                                                dni: selected?.dni || "",
                                                gender: selected?.gender || "",
                                                disciplines: selected?.disciplines || [],
                                                category: selected?.category || "",
                                                applicationDate: dayjs(),
                                            });
                                        }}
                                    >
                                        {user.familyGroup.map((member) => (
                                            <MenuItem key={member.dni} value={member.dni}>
                                                {member.name} {member.lastName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* CAMPOS EDITABLES SOLO SI SELECCIONÓ FAMILIAR */}
                                {selectedMember && (
                                    <>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            label="Nombre"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name ? errors.name : " "}
                                            sx={{ mt: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            name="lastName"
                                            label="Apellido"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName ? errors.lastName : " "}
                                            sx={{ mt: 1 }}
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha de Nacimiento"
                                                format="DD/MM/YYYY"
                                                value={values.birthDate ? dayjs(values.birthDate) : null}
                                                onChange={(newValue) => {
                                                    if (!newValue) {
                                                        setValues({ ...values, birthDate: null, category: "" });
                                                        return;
                                                    }

                                                    const birthDate = dayjs(newValue);
                                                    const today = dayjs();
                                                    const age = today.diff(birthDate, "year");

                                                    // Calculamos la categoría según la edad
                                                    let category = "";
                                                    if (age < 18) {
                                                        category = "Menor";
                                                    } else {
                                                        category = "Activo adherente";
                                                    }

                                                    setValues({
                                                        ...values,
                                                        birthDate,
                                                        category,
                                                    });
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        margin: "dense",
                                                        error: touched.birthDate && Boolean(errors.birthDate),
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                        <TextField
                                            fullWidth
                                            name="dni"
                                            label="DNI"
                                            value={values.dni}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.dni && Boolean(errors.dni)}
                                            helperText={touched.dni && errors.dni ? errors.dni : " "}
                                            sx={{ mt: 1 }}
                                        />

                                        <FormControl fullWidth sx={{ mt: 1 }}>
                                            <InputLabel id="gender-label">Género</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                name="gender"
                                                value={values.gender}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="Masculino">Masculino</MenuItem>
                                                <MenuItem value="Femenino">Femenino</MenuItem>
                                                <MenuItem value="Otro">Otro</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth sx={{ mt: 1 }}>
                                            <InputLabel id="discipline-label">Disciplinas</InputLabel>
                                            <Select
                                                labelId="discipline-label"
                                                multiple
                                                value={disciplineFamily}
                                                onChange={(e) => {
                                                    const newValue =
                                                        typeof e.target.value === "string"
                                                            ? e.target.value.split(",")
                                                            : e.target.value;
                                                    setDisciplineFamily(newValue);
                                                    setValues({ ...values, disciplines: newValue });
                                                }}
                                                input={<OutlinedInput label="Disciplinas" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                        {(selected as string[]).map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                            >
                                                {disciplines?.map((item: any) => (
                                                    <MenuItem key={item.id} value={item.name}>
                                                        <Checkbox checked={disciplineFamily.indexOf(item.name) > -1} />
                                                        <ListItemText primary={item.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* <FormControl fullWidth sx={{ mt: 1 }}>
                                            <InputLabel id="category-label">Categoría</InputLabel>
                                            <Select
                                                labelId="category-label"
                                                name="category"
                                                value={values.category}
                                                onChange={handleChange}
                                            >
                                                {categories?.map((c) => (
                                                    <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl> */}
                                        <Grid container size={12}>
                                            <Grid display="flex" size={6} alignItems="center" sx={{ mt: 3, mb: 0 }}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        label="Categoría"
                                                        value={values.category + (full ? " - Pleno" : "")}
                                                        slotProps={{
                                                            htmlInput: {
                                                                readOnly: true,
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid display="flex" size={6} alignItems="center" sx={{ mt: 3, mb: 0 }}>
                                                <FormControlLabel
                                                    control={<Switch checked={full} onChange={handleToggleFull} />}
                                                    label="Pleno"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} sx={{ mt: 3 }}>
                                            <Grid size={4}>
                                                <Button fullWidth variant="contained" color="inherit" onClick={handleCloseEdit}>
                                                    CANCELAR
                                                </Button>
                                            </Grid>
                                            <Grid size={4}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ backgroundColor: "#b71c1c", "&:hover": { backgroundColor: "darkred" } }}
                                                    onClick={handleDeleteMember}
                                                >
                                                    ELIMINAR SOCIO
                                                </Button>
                                            </Grid>
                                            <Grid size={4}>
                                                <Button fullWidth type="submit" variant="contained" sx={{ backgroundColor: "#b71c1c", "&:hover": { backgroundColor: "darkred" } }}>
                                                    GUARDAR CAMBIOS
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default EditFamilyModal;
