// {/* LISTA DE SOCIOS */}

// <FormControl
// error={Boolean(touched.familyGroup && errors.familyGroup)}
// fullWidth
// sx={{ mb: 0, mt: 1 }}
// >
// <InputLabel
//     id="demo-multiple-chip-label"
//     sx={{
//         "&.Mui-focused": {
//             color: "#b71c1c", // Color cuando está enfocado
//         },
//     }}
// >
//     Lista de Socios
// </InputLabel>
// <Select
//     name="familyGroup"
//     labelId="demo-multiple-chip-label"
//     id="demo-multiple-chip"
//     multiple
//     value={familyGroupS} // Aquí guardas un array de dni
//     onChange={(event) => {
//         // event.target.value es un array de dni seleccionados
//         handleFamilyGroup(event); // tu función para manejar selección
//         handleChange({ target: { name: "familyGroup", value: event.target.value } }); // para Formik u otro form handler
//     }}
//     onBlur={handleBlur}
//     sx={{
//         "& .MuiOutlinedInput-notchedOutline": {
//             borderColor:
//                 touched.familyGroup && errors.familyGroup ? "#b71c1c" : undefined,
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#b71c1c",
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#b71c1c",
//         },
//     }}
//     input={<OutlinedInput id="select-multiple-chip" label="Lista de Socios" />}
//     renderValue={(selected) => (
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//             {/* selected es un array de dni, buscamos el usuario para mostrar apellido y nombre */}
//             {selected.map((dni) => {
//                 const user = allUsers.find((u) => u.dni === dni);
//                 return <Chip key={dni} label={user ? `${user.lastName} ${user.name}` : dni} />;
//             })}
//         </Box>
//     )}
//     MenuProps={MenuProps}
// >
//     {allUsers?.length > 0 ? (
//         allUsers.map((user: any) => (
//             <MenuItem
//                 key={user.dni}
//                 value={user.dni} // guardamos el dni
//                 style={getStyles(user.dni, familyGroupS, theme)} // pasamos dni para estilos
//             >
//                 <Checkbox checked={familyGroupS.indexOf(user.dni) > -1} />
//                 <ListItemText primary={`${user.lastName} ${user.name}`} />
//             </MenuItem>
//         ))
//     ) : (
//         <p>Cargando Socios...</p>
//     )}
// </Select>
// {touched.familyGroup && errors.familyGroup ? (
//     <Typography color="error" variant="caption">
//         Debe seleccionar al menos un socio
//     </Typography>
// ) : (
//     <span> &nbsp; </span>
// )}
// </FormControl>