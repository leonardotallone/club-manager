import React, { useContext } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Chip,
    ListItemText,
    Checkbox,
    Switch,
    FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getAllDisciplinesContext } from "../../Context/GetAllDisciplinesContext";
import { updateUserProfileContext } from "../../Context/UpdateUserProfileContext";

import LoadingOverlay from "../../components/LoadingOverlay";

interface EditFamilyFormProps {
    user: any;
    onClose: () => void;
}

const validationSchemaFamily = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de nombre incorrecto")
        .required("Campo obligatorio"),
    lastName: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Formato de apellido incorrecto")
        .required("Campo obligatorio"),
    birthDate: Yup.date()
        .max(new Date(), "La fecha de nacimiento no puede ser futura")
        .required("Campo obligatorio"),
    dni: Yup.string()
        .matches(/^\d+$/, "Solo números")
        .min(7, "Debe tener al menos 7 dígitos")
        .max(8, "Debe tener como máximo 8 dígitos")
        .required("Campo obligatorio"),
});

const capitalizeWords = (str: string) =>
    str
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase());

const ensureStringArray = (v: any): string[] =>
    Array.isArray(v) ? v : typeof v === "string" ? [v] : [];

const EditFamilyForm: React.FC<EditFamilyFormProps> = ({ user, onClose }) => {
    const { disciplines } = useContext(getAllDisciplinesContext);
    const { setUpdateFamilyUser, loading } = useContext(updateUserProfileContext);
    const genders = ["Masculino", "Femenino", "Otro"];

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: { xs: "flex-start", md: "center" },
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                borderRadius: { xs: 0, md: 3 },
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                width: "100%",
                height: { xs: "100vh", md: "auto" },
                overflowY: { xs: "auto", md: "visible" },
                WebkitOverflowScrolling: "touch",
                py: { xs: 3, md: 5 },
                px: { xs: 2, md: 0 },
            }}
        >
            <Container maxWidth="md" sx={{ pb: { xs: 10, md: 5 }, pt: { xs: 1, md: 2 } }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        textAlign: "center",
                        color: "#333",
                        letterSpacing: 0.5,
                    }}
                >
                    Editar Familiar
                </Typography>

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: user?.name || "",
                        lastName: user?.lastName || "",
                        birthDate: user?.birthDate
                            ? dayjs(user.birthDate.toDate?.() || user.birthDate)
                            : null,
                        dni: user?.dni || "",
                        oldDni: user?.dni || "", // 👈 DNI original
                        avatarURL: user?.avatarURL || "",
                        gender: user?.gender || "",
                        disciplines: user?.disciplines || [],
                        category: user?.category || "",
                        full: user?.full || false,
                        applicationDate: user?.applicationDate
                            ? dayjs(user.applicationDate.toDate?.() || user.applicationDate)
                            : dayjs(),
                    }}
                    validationSchema={validationSchemaFamily}
                    onSubmit={(values) => {
                        // Convertimos fechas a Date antes de enviar
                        const formatted = {
                            ...values,
                            birthDate: values.birthDate ? dayjs(values.birthDate).toDate() : null,
                            applicationDate: values.applicationDate
                                ? dayjs(values.applicationDate).toDate()
                                : new Date(),
                        };

                        // ✅ Guardar cambios del familiar
                        setUpdateFamilyUser(formatted);
                        onClose();
                    }}
                >
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue, isValid, dirty }) => (
                        <Form>
                            <Grid container spacing={4}>
                                {/* COLUMNA IZQUIERDA */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="name"
                                        label="Nombre"
                                        value={values.name}
                                        onChange={(e) => {
                                            const capitalized = capitalizeWords(e.target.value);
                                            setFieldValue("name", capitalized);
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && typeof errors.name === "string" ? errors.name : " "}
                                        sx={{
                                            mb: -2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="lastName"
                                        label="Apellido/s"
                                        value={values.lastName}
                                        onChange={(e) => {
                                            const capitalized = capitalizeWords(e.target.value);
                                            setFieldValue("lastName", capitalized);
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && typeof errors.lastName === "string" ? errors.lastName : " "}
                                        sx={{
                                            mt: 2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="Fecha de Nacimiento"
                                            value={values.birthDate}
                                            onChange={(newValue) => {
                                                setFieldValue("birthDate", newValue);
                                                if (newValue) {
                                                    const today = dayjs();
                                                    const age = today.diff(dayjs(newValue), "year");
                                                    const newCategory = age < 18 ? "Menor" : "Activo Adherente";
                                                    setFieldValue("category", newCategory);
                                                } else {
                                                    setFieldValue("category", "");
                                                }
                                            }}
                                            slotProps={{
                                                textField: {
                                                    variant: "standard",
                                                    fullWidth: true,
                                                    sx: {
                                                        "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                                        "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                                    },
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>

                                    <FormControl variant="standard" fullWidth sx={{ mt: 2.5 }}>
                                        <InputLabel id="gender-label" sx={{ "&.Mui-focused": { color: "green" } }}>
                                            Género
                                        </InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            name="gender"
                                            value={values.gender}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{
                                                "& .MuiSelect-select": { "&:focus": { backgroundColor: "transparent" } },
                                                "&::before": { borderBottom: "1px solid rgba(0,0,0,0.42)" },
                                                "&:hover:not(.Mui-disabled):before": { borderBottom: "1px solid green" },
                                                "&::after": { borderBottom: "2px solid green" },
                                            }}
                                        >
                                            {genders.map((g) => (
                                                <MenuItem key={g} value={g}>
                                                    {g}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* COLUMNA DERECHA */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {/* ✅ DNI editable */}
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="dni"
                                        label="DNI"
                                        value={values.dni}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.dni && Boolean(errors.dni)}
                                        helperText={touched.dni && typeof errors.dni === "string" ? errors.dni : " "}
                                        sx={{
                                            mb: -2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    {/* Disciplinas */}
                                    <FormControl variant="standard" fullWidth sx={{ mt: 2.5 }}>
                                        <InputLabel id="discipline-label" sx={{ "&.Mui-focused": { color: "green" } }}>
                                            Disciplinas
                                        </InputLabel>
                                        <Select
                                            labelId="discipline-label"
                                            multiple
                                            value={values.disciplines}
                                            onChange={(event) => {
                                                const newValue =
                                                    typeof event.target.value === "string"
                                                        ? event.target.value.split(",")
                                                        : event.target.value;
                                                setFieldValue("disciplines", newValue);
                                            }}
                                            sx={{
                                                "& .MuiSelect-select": { "&:focus": { backgroundColor: "transparent" } },
                                                "&::before": { borderBottom: "1px solid rgba(0,0,0,0.42)" },
                                                "&:hover:not(.Mui-disabled):before": { borderBottom: "1px solid green" },
                                                "&::after": { borderBottom: "2px solid green" },
                                            }}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                    {ensureStringArray(selected).map((v) => (
                                                        <Chip key={v} label={v} />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {disciplines?.length ? (
                                                disciplines.map((item: any) => {
                                                    const label = item?.name ?? "";
                                                    return (
                                                        <MenuItem key={item?.id ?? label} value={label}>
                                                            <Checkbox checked={ensureStringArray(values.disciplines).includes(label)} />
                                                            <ListItemText primary={label} />
                                                        </MenuItem>
                                                    );
                                                })
                                            ) : (
                                                <MenuItem disabled>Cargando...</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    {/* Categoría y Pleno */}
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        name="category"
                                        label="Categoría"
                                        value={values.category + (values.full ? " - Pleno" : "")}
                                        disabled
                                        sx={{
                                            mt: 2.5,
                                            "& .MuiInput-underline:after": { borderBottomColor: "green" },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                                        }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={values.full}
                                                onChange={(e) => setFieldValue("full", e.target.checked)}
                                            />
                                        }
                                        label="Pleno"
                                        sx={{ mt: 2 }}
                                    />
                                </Grid>
                            </Grid>

                            {/* BOTONES */}
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={onClose}
                                        sx={{
                                            backgroundColor: "grey",
                                            "&:hover": { backgroundColor: "darkgrey" },
                                        }}
                                    >
                                        CANCELAR
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disabled={!isValid || !dirty}
                                        sx={{
                                            backgroundColor: isValid && dirty ? "green" : "lightgrey",
                                            "&:hover": {
                                                backgroundColor: isValid && dirty ? "darkgreen" : "lightgrey",
                                            },
                                        }}
                                    >
                                        GUARDAR CAMBIOS
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <LoadingOverlay open={loading} />
            </Container>
        </Box>
    );
};

export default EditFamilyForm;
